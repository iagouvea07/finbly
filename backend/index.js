const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit: "100mb"}));

async function startServer() {
  try {
    //await db.sequelize.sync();
    //console.log(`✅ Database syncronized`);

    //await rabbitmq.connect();
    //console.log('✅ Connected to RabbitMQ');

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
      
  } catch (err) {
    console.error('❌ Error to initizalize server:', err.message);
  }
}

startServer();