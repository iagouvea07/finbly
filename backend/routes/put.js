const router = require('express').Router();
const db = require('../middleware/db.js');

router.put('/password-update', async (req, res) => {
    const { id, password } = req.body
    const response = await db.Users.update({ password: password }, 
        {
            where: {
                id: id
            }
        }
    )

    res.status(200).send({message: response})
})

module.exports = router