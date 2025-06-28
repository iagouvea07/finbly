const router = require('express').Router();
const db = require('../middleware/postgres.js');
const bcrypt = require('bcrypt');


router.put('/set-password', async (req, res) => {
    const {username, email, password} = req.body;
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    await db.Users.update(
        {password: hashPassword, is_active: 't'},
        {
            where: {
                username: username,
                email: email
            }
        }
    )

    res.status(200).send({message: "success!"})
    
})

module.exports = router
