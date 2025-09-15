const router = require('express').Router();
const dotenv = require('dotenv');

dotenv.config();

router.get('/health', (req, res) => {
    res.send({ status: 'healthy' })
})

module.exports = router;