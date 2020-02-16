'use strict'

const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid/v4');
const path = require('path');
const app = express();

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(body.json());
app.use(cookie());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/signup', function (req, res) {
  const password = req.body.password;
  const email = req.body.email;
  const age = req.body.age;

  

  console.log(password , email , age)

  id = uuid()

  res.cookie('coockie-id', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});

  
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


