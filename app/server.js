const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const mongoose = require('mongoose');
const utils = require('./utils/utils.js');
const secrets = require('./secrets/secrets.js');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
mongoose.connect(secrets.MONGO_URI);

let db = mongoose.connection;

let keywords_dict = {};

let token_dict = {};

db.on('error', console.error.bind('connection error:'));

db.on('open', () => {
  
  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
});

app.get('/', (req, res) => {
  
  res.status(200).send("Index");
});

app.post('/keywords', (req, res) => {

  if (req.hasOwnProperty("key") && token_dict[req.body.key] != undefined) {

    let group_id = token_dict[req.body.key]

    let key_value_pair = {
      keyword: req.body.keyword,
      value: req.body.value
    }

    if (keywords_dict[group_id] != undefined) {
      
      keywords_dict[group_id].push(key_value_pair);
    } else {

      keywords_dict[group_id] = [];
      keywords_dict[group_id].push(key_value_pair);
    }
  }

  res.status(200).send();
});

app.put('/keywords', (req, res) => {
  
  res.status(200).send();
});

app.delete('keywords', (req, res) => {
  
  res.status(200).send();
});

app.get('/keywords', (req, res) => {

  if (req.query.hasOwnProperty("group_id") 
      && req.query.hasOwnProperty('timestamp')) {

    let key = utils.hashKey(req.query.group_id + req.query.timestamp + Math.random());
    token_dict.key = key
    token_dict.group_id = req.query.group_id
    console.log(JSON.stringify(token_dict))

    res.status(200).send(key);

  } else {

    if (token_dict.key != undefined) {

      console.log(JSON.stringify(keywords_dict));
      res.status(200).send(JSON.stringify(keywords_dict[req.query.key]));
    } else {

      res.status(404).send(req.query.key + " not found");
    }
  }
});
