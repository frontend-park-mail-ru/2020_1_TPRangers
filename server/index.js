const moduleDataBase = require('./DataBase.js');
const cookieDataBase = require('./CookieDataBase.js')
const database = new moduleDataBase;
const cookiebase = new cookieDataBase;

database.add({
    email: "123123@yandex.ru",
    password: "123",
    age: 123
})

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



app.get('/main', function(req, res) {
    res.send('Hello World!');
});


function isDataAlreadyExist(login) {
    if (database.getByLogin(login) === undefined) {
        return false;
    }
    return true;
}

app.post('/registration', function(req, res) {
    console.log("=========SIGNUP=============");
    const login = req.body.email;


    /*Есть ли в бд*/
    if (isDataAlreadyExist(login)) {
        res.status(400).json({ error: "Such user already exist" })
        console.log("User already Exist");
        return;
    }

    // generating cookie id and adding them to cookie
    cooId = uuid();
    cookiebase.addCookie(cooId, login);
    res.cookie('cookie-id', cooId, { expires: new Date(Date.now() + 10e10) });
    console.log("Cookie ID is :", cooId);

    database.add(req.body);

    /*Вернуть json status*/

    res.status(201).json({ cooId });
    console.log("======================");

    console.log(database.getByLogin(login));


});


function isSignInOk(data) {

    if (database.getByLogin(data.email) === undefined) {
        return false;
    }
    const AuthUser = database.getByLogin(data.email);
    console.log("AuthUser: ");
    console.log(AuthUser);
    if (AuthUser.login === data.email && AuthUser.password === data.password) {
        return true;
    } else {
        false;
    }
}

app.post('/login', function(req, res) {
    console.log("=========SIGNIN=============");

    console.log(req.body.password);
    /*Есть ли в бд*/



    if (isSignInOk(req.body)) {

        cooId = uuid();
        console.log("Cookie ID is :", cooId);
        cookiebase.addCookie(cooId, req.body.email);
        res.cookie('cookie-id', cooId, { expires: new Date(Date.now() + 10e10) });


        res.status(200).json({ cooId })
        console.log("======================");


    } else {
        res.status(400).json({ error: "User doesn't exist" })
        console.log("User doesn't exist");
    }

    // generating cookie id and adding them to cookie

});

app.get('/about', function(req, res) {

    console.log("=========PROFILE=============");

    login = cookiebase.dataByCookie(req.cookies['cookie-id']);
    console.log("Cookie ID is :", req.cookies['cookie-id']);

    userProfile = database.getByLogin(login);

    if (userProfile === undefined) {
        res.status(401).json({ error: "we've got some issuses" });
    } else {
        console.log(userProfile);
        res.status(200).json({ data: userProfile });
    }

    console.log("======================");


});



app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});