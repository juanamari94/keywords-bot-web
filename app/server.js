const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const mongoose = require('mongoose');
const utils = require('./utils/utils.js');
const secrets = require('./secrets/secrets.js');
const Group = require('./models/Group');
const redis = require('redis');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
mongoose.connect(secrets.MONGO_URI);

const redis_client = redis.createClient(secrets.REDIS_PORT, secrets.REDIS_HOST);

redis_client.auth(secrets.REDIS_PASSWORD, function (err) {
  if (err) throw err;
});

redis_client.on('connect', function() {
  console.log('Connected to Redis');
});


const db = mongoose.connection;

let token_dict = {};

db.on('error', console.error.bind('connection error:'));

db.on('open', () => {
  
  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
});

app.get('/', (req, res) => {
  
  return res.status(200).send("Index");
});

app.all('/token', (req, res, next) => {

  if (req.headers.api_key != secrets.API_KEY) {
    
    return res.status(401).send("Invalid API Key.");
  } else {

    next();
  }
});

app.get('/token/:group_id', (req, res) => {

  let group_id = req.params.group_id;

  redis_client.get(group_id, (err, token_reply) => {
    if (err) {

      console.error(err)
      return res.status(500).send();
    } else {

      return res.status(200).send(token_reply);
    }
  });
});

app.post('/token', (req, res) => {

  if (req.body.group_id == undefined) {
    return res.status(400).send();
  }

  const group_id = req.body.group_id;

  let group_token = utils.hashKey(group_id + Math.random());

  const group = Group({
    group_id: group_id,
    keyword_map: []
  });

  group.save().then(() => {
  
    redis_client.set(group_id, group_token, (err, token_reply) => {
      
      if (err) {
  
        console.error(err);
        return res.status(500).send();
      } else {

        return res.status(200).send();
      }
    });
  }).catch((err) => {

    console.error(err.message);
    return res.status(403).send("Group already exists.");
  });
});

app.put('/token/:group_id', (req, res) => {
  
  const group_id = req.params.group_id;

  redis_client.get(group_id, (err, token_reply) => {

    if (err) {

      console.error(err)
      return res.status(500).send();
    } else {

      const group_token = utils.hashKey(group_id + Math.random());

      redis_client.set(group_id, group_token, (err, set_reply) => {
        
        if (err) {

          console.error(err)
          return res.status(500).send();
        } else {

          return res.status(200).send(group_token);
        } 
      });
    }
  });
});

app.all('/keywords/:group_id', (req, res, next) => {

  if (req.headers.token == undefined) {

    return res.status(401).send("Group token missing."); 
  } else if (token_dict[req.params.group_id] == undefined) {
    
    return res.status(404).send("Group does not exist");
  } else if (token_dict[req.params.group_id] != req.headers.token) {

    return res.status(401).send("Tokens do not match.");
  }

  next();
});

app.get('/keywords/:group_id', (req, res) => {

  Group.find({group_id: req.params.group_id}).then(group => {

    res.status(200).send(group);
  }).catch(err => {

    throw err;
  });
});

app.get('/keywords/:group_id/:keyword', (req, res) => {
  
  let group_id = req.params.group_id;
  let requested_keyword = req.params.keyword;
  let group_id_keywords = groups.find(group => group.group_id == group_id);
  let keyword = group_id_keywords.keywords_map.find(keyword => keyword.key == requested_keyword);

  console.log(keyword);

  if (keyword == undefined) {

    return res.status(404).send();
  } else {

    return res.status(200).send(keyword.value);
  }
});

app.put('/keywords/:group_id/:keyword', (req, res) => {
  
  return res.status(200).send();
});

app.delete('/keywords/:group_id/:keyword', (req, res) => {
  
  return res.status(200).send();
});
