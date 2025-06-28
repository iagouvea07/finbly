const router = require('express').Router();
const db = require('../middleware/postgres.js');
const rabbitmq = require('../middleware/rabbitmq.js');

router.post('/register', async (req, res) => {
    const { username, name, last_name, email } = req.body;

    const findUser = await db.Users.findAll({
        attributes: ['id', 'username'], 
        where: { username: username}
    })

    if(findUser.length > 0 && findUser[0].dataValues.username == username) {
        console.log("user already exists")
        return res.status(400).send({ message: "User already exists" })
    }

    const re = /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"[^"]+")@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
    const characters = [
        'abcdefghijklmnopqrstuvwxyz',         
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ',         
        '1234567890',                        
        '!@#$%&_'                            
    ];

    let password = '';

    for(let i = 1; i <= 12; i++) {
        const set = characters[Math.floor(Math.random() * characters.length)];
        const char = set[Math.floor(Math.random() * set.length)];
        password += char;
    }

    if(username && name && last_name && password && re.test(email)) {
        await db.Users.create({
            username: username,
            name: name,
            last_name: last_name,
            email: email, 
            password: password
        }, 
        { fields: ['username', 'name', 'last_name', 'email', 'password'] });

        const channel = await rabbitmq.connect();
        const message = {username, email};

        channel.sendToQueue('mail_queue', Buffer.from(JSON.stringify(message)));
        console.log(`[x] Sent: ${message}`);

        res.status(200).send('Success!');  
    }
    else {
        console.log('Required information is missing or content is invalid')
        res.status(401).send({ message: 'Required information is missing or content is invalid' })
    }
});

router.post('/password-recovery', async (req, res) => {
    const {email} = req.body;

    const findUser = await db.Users.findAll({
        attributes: ['username', 'email'],
        where: {email: email}
    })

    if(findUser.length > 0 && findUser[0].dataValues.email === email) {
        const channel = await rabbitmq.connect();
        const username = findUser[0].dataValues.email
        const message = {username, email};

        channel.sendToQueue('mail_queue', Buffer.from(JSON.stringify(message)));
        console.log(`[x] Sent: ${message}`);

        res.status(200).send('Success!'); 
    }
    else {
        res.status(404).send({ message: 'User not found!' })
    }
})

router.post('/budget-create', async (req, res) => {
    const [name, value, type, period] = req.body;
    
//    const response = await db.Budget

})


module.exports = router;