const router = require('express').Router();
const db = require('../middleware/db.js');

router.get('/users', async (req, res) => {
    try {
        const result = await db.Users.findAll({attributes: ['id', 'username']})
        res.status(200).send({message: result})
    } catch(err) {
        res.status(500).send({message: err})
    }

})

module.exports = router;