const amqp = require('amqplib');
const dotenv = require('dotenv');

dotenv.config();

let connection = null;
let channel = null;

async function connect() {
  if (connection === null) {
    try {
      connection = await amqp.connect(`amqp://${process.env.RABBITMQ_HOST}`);
      channel = await connection.createChannel();

      const queue = 'mail_queue';
      
      await channel.assertQueue(queue, { durable: true });

    } catch (err) {
      console.error('❌ Failed to connect to RabbitMQ', err);
      process.exit(1);
    }
  }
  return channel;
}

module.exports = {
  connect
};