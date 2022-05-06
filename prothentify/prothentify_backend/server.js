const express = require('express');
const app = express();
const server = require('http').createServer(app);
const bodyParser = require('body-parser');
const man = require('./routes/manufacturer');
const sel = require('./routes/seller');
const ver = require('./routes/verify');

server.listen(5000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use('/manufacturer', man);
app.use('/seller', sel);
app.use('/verify', ver);
