require('dotenv').config();
const express     = require('express');
const app         = express();
const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI = process.env.MONGODB_URI;
const bodyParser  = require('body-parser');
const cors        = require('cors');

app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.PORT || 8080;


const events = [];

MongoClient.connect(MONGODB_URI, (err, db) => {

  //logs connection status
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  const DataHelpers = require('./lib/dataHelpers')(db);

  const rootRoutes = require('./routes/root')(DataHelpers);

  app.use('/', rootRoutes);
});

app.listen(PORT, () => {
  console.log('Simple API listening on port', PORT);
})
