const http = require("node:http");
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');

const router = require('./routes/router.js');

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '256mb'}));

app.use('/', router.getRouter);
app.use('/', router.postRouter);


server.listen(PORT, () => {
    console.log(`Listening on: ${PORT}`);
})