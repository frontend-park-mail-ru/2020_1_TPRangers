const moduleDataBase = require('./DataBase.js');
const cookieDataBase = require('./CookieDataBase.js')
const database = new moduleDataBase;
const cookiebase = new cookieDataBase;

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
    console.log("=========SIGNUP=============");
    const login = req.body.email;
    

    /*Есть ли в бд*/
    if(isDataAlreadyExist(login)){
        res.status(400).json({error : "Such user already exist"})
        console.log("User already Exist");
        return;
    }

    // generating cookie id and adding them to cookie
    cooId = uuid();
    cookiebase.addCookie(cooId);
    res.cookie('cookie-id', cooId, {expires: new Date(Date.now() + 1000 * 60 * 10)});

    database.add(req.body);

    
    /*Вернуть json status*/

    // что отправлять фронту ? 
    res.status(200)
    console.log("======================");

    console.log(database.getByLogin(login));


  });


function isSignInOk(data){

  if(database.getByLogin(data.email) === undefined){
    return false;
  }
  const AuthUser = database.getByLogin(data.email);
  console.log("AuthUser: ");
  console.log(AuthUser);
  if(AuthUser.login === data.email || AuthUser.password === data.password){
    return true;
  } else{
    false;
  }
}

app.post('/login', function (req, res) {
    console.log("=========SIGNIN=============");
    

    /*Есть ли в бд*/
    
    if(isSignInOk(req.body)){
      res.status(200)
      console.log("======================");
       
    } else {
      res.status(400).json({error : "User doesn't exist"})
      console.log("User doesn't exist");
    }

    // generating cookie id and adding them to cookie


  });




app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
