

const moduleDataBase = require('./DataBase.js');
const database = new moduleDataBase;

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

function isDataAlreadyExist(login){
    if(database.getByLogin(login) === undefined){
        return false;
    }
    return true;
}

app.post('/signup', function (req, res) {
    console.log("kekdfdf");
    const password = req.body.password;
    const login = req.body.email;
    const age = req.body.age;

    if(isDataAlreadyExist(login)){
        console.log(-1);
        return -1;
    }

    database.add(req.body);
    

    /*Есть ли в бд*/
   

    
    /*Вернуть json status*/



  });



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});