const nodemailer = require('nodemailer')
const dotenv = require('dotenv')

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD
  },
})

async function sendEmail(dest, subject, body) {
  const info = await transporter.sendMail({
    from: process.env.EMAIL_ADDRESS,
    to: dest, 
    subject: subject,
    html: body
  });

  console.log("Mensagem enviada: %s", info.messageId)
}


module.exports = { sendEmail }