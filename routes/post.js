const router = require('express').Router();
const dotenv = require('dotenv');

dotenv.config();

router.post('/register', async (req, res) => {
    const {firstName, lastName, birthday, email} = req.body

    const user = {
        firstName: firstName,
        lastName: lastName,
        birthday: birthday,
        email: email
    }

    res.status(200).send({response: user});
})

module.exports = router;