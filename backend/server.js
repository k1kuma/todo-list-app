const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;

const DATABASE_NAME = "items";
const CONNECTION_URL = 'mongodb+srv://k1kuma:k1kuma89@cluster0.zcvt8.mongodb.net/'
                          + DATABASE_NAME + '?retryWrites=true&w=majority&&ssl=true';

const itemRoute = require('./routes/item.route');

// Useful URL Setting up MongoAtlas DB with Node/Express Backend

let app = express();
let cors = require('cors');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/items', itemRoute) // express route

const port = process.env.PORT || 4000; // PORT

app.listen(port, () => {
  // Connecting mongoDB Database
  mongoose.Promise = global.Promise;
  mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    dbName: 'items' 
  }).then((client) => {
    console.log(DATABASE_NAME + ' Database sucessfully connected!')
  },
    error => {
      console.log('Could not connect to database : ' + error)
    }
  )
});

// 404 error
app.use((req, res, next) => {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});