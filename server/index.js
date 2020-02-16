
'use strict'



let moduleDataBase = require('./DataBase');

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


const database = moduleDataBase.database;

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


function isDataAlreadyExist(login){
    if(database.getByLogin(login) == -1){
        return false;
    }
    return true;
}

app.post('/signup', function (req, res) {
    const password = req.body.password;
    const login = req.body.email;
    const age = req.body.age;
    

    /*Есть ли в бд*/
    if(isDataAlreadyExist(login)){
        return -1;
    }

    database.add(req.body);
    
    /*Вернуть json status*/
    console.log(database.getByLogin(login));


  });



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

