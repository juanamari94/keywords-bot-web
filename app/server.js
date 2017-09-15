const express = require('express')
const bodyParser= require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))

app.listen(3000, () => {
  console.log("Listening on port 3000");
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