const amqp = require('amqplib');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken')
const sendmail = require('./js/sendmail.js');

dotenv.config();

async function consume() {
    try {
        const connection = await amqp.connect(`amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@${process.env.RABBITMQ_HOST}`);
        const channel = await connection.createChannel();
        const queue = 'mail_queue';

        console.log('Sendmail worker initialized');
        await channel.assertQueue(queue, {durable: true});
        
        channel.consume(queue, (msg) => {
            if(msg !== null) {
                const messageContent = JSON.parse(msg.content.toString());

                const characters = [
                    'abcdefghijklmnopqrstuvwxyz',         
                    'ABCDEFGHIJKLMNOPQRSTUVWXYZ',         
                    '1234567890',                        
                ];

                let messageId = '';

                const token = jwt.sign(
                    {
                        username: messageContent.username,
                        email: messageContent.email
                    },
                    process.env.JWT_SECRET,
                    { 
                        expiresIn: '24h' 
                    }
                )

                for (let i = 1; i <= 20; i++) {
                    const set = characters[Math.floor(Math.random() * characters.length)];
                    const char = set[Math.floor(Math.random() * set.length)];
                    messageId += char;
                }
                const message = {
                    subject: 'Finbly - User Access',
                    body: `
                        <h2>Greetings,</h2>
                        <br>
                        <p>Thank you for choose Finbly as your finance app!!</p>
                        <p>There are your username for first access.</p>
                        <br>
                        <p>user: ${messageContent.username}</p>
                        <br>
                        <p>to activate your user, click on the link below:</p>
                        <a href="http://${process.env.FINBLY_URL}/set-password?id=${token}">Activate user</a>
                        <br>
                        <p>Enjoy!!</p>
                    `,
                    id: `id-${messageId}`
                }

                sendmail.sendEmail(messageContent.email, message.subject, message.body);
                console.log('processada: ', message.id);

                channel.ack(msg);
            }
        })
    } catch (err) {
        console.error('❌ Failed to connect to RabbitMQ', err);
    }
}

consume();