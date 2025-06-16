const router = require('express').Router();
const db = require('../middleware/db.js');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

router.get('/users', async (req, res) => {
    try {
        const result = await db.Users.findAll({attributes: ['id', 'username']})
        res.status(200).send({message: result})
    } catch(err) {
        res.status(500).send({message: err})
    }

})

router.get('/user-activate', async (req, res) => {
    const token = req.query.id
    const tokenDecoded = jwt.decode(token, process.env.JWT_SECRET)

    const getUser = await db.Users.findAll({
        attributes: ['username', 'email'], 
        where: { 
            username: tokenDecoded.username, 
            email: tokenDecoded.email
        }
    })

    res.status(200).send(getUser[0].dataValues)
})

module.exports = router;