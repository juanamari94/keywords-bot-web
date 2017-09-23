const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const utils = require('./utils/utils.js');
const secrets = require('./secrets/secrets.js');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let db;

MongoClient.connect(secrets.MONGO_URI, (err, database) => {
  if (err) return console.log(err);
  db = database;
  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
});

app.get('/', (req, res) => {
  res.status(200).send("Index");
});

app.get('/keys', (req, res) => {
  res.status(200).send("/keys");
});

app.get('/keys/:id', (req, res) => {
  res.status(200).send("/keys" + req.params.id);
});

app.post('/keys', (req, res) => {
});

app.post('/register', (req, res) => {
  let body = req.body;
  if (body.hasOwnProperty('group_id') && body.hasOwnProperty('timestamp')) {
    let key = utils.hashKey(body.group_id + body.timestamp);
    res.status(200).send(key);
  } else {
    res.status(400).send();
  }
});

app.delete('/keys/:id', (req, res) => {

});