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



app.get('/', function(req, res) {
    res.send('Hello World!');
});

function isDataAlreadyExist(login) {
    if (database.getByLogin(login) === undefined) {
        return false;
    }
    return true;
}

app.post('/signup', function(req, res) {
    console.log("=========SIGNUP=============");
    const login = req.body.email;


    /*Есть ли в бд*/
    if (isDataAlreadyExist(login)) {
        res.status(400).json({ error: "Such user already exist" });
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

});

app.get('/profile', function(req, res) {

    console.log("=========PROFILE=============");

    login = cookiebase.dataByCookie(req.cookies['cookie-id']);
    console.log("Cookie ID is :", req.cookies['cookie-id']);

    userProfile = database.getByLogin(login);

    if (userProfile === -1) {
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