const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

async function mongoConnect() {
    try {
        await mongoose.connect(`mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`);
    }
    catch(err) {
        throw err;
    }
}

module.exports = {mongoConnect}