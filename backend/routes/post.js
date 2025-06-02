const router = require('express').Router();
const db = require('../middleware/db.js');
const rabbitmq = require('../middleware/rabbitmq.js');

router.post('/admin/register', async (req, res) => {
    const { username, name, last_name, email } = req.body;

const characters = [
    'abcdefghijklmnopqrstuvwxyz',         
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ',         
    '1234567890',                        
    '!@#$%&_'                            
];

let password = '';

for (let i = 1; i <= 12; i++) {
    const set = characters[Math.floor(Math.random() * characters.length)];
    const char = set[Math.floor(Math.random() * set.length)];
    password += char;
}

    await db.Users.create({
        username: username,
        name: name,
        last_name: last_name,
        email: email, 
        password: password
    }, 
    { fields: ['username', 'name', 'last_name', 'email', 'password'] });

    const channel = await rabbitmq.connect();
    const message = {
        username,
        email,
        password
    };

    channel.sendToQueue('mail_queue', Buffer.from(JSON.stringify(message)));
    console.log(`[x] Sent: ${message}`);

    res.status(200).send('Success!');
});

module.exports = router;