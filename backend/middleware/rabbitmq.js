const amqp = require('amqplib');
const dotenv = require('dotenv');

dotenv.config();

let connection = null;
let channel = null;

const rabbitmqUrl = `amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@${process.env.RABBITMQ_HOST}`

async function connect() {
  if (connection === null) {
    try {
      connection = await amqp.connect(rabbitmqUrl);
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