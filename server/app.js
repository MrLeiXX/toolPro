let express = require('express');
let path = require('path');
let ejs = require('ejs');
let bodyParser = require("body-parser");
let cookieParser = require("cookie-parser");
let session = require("express-session");
let mongoose = require('mongoose');
let DB_URL = 'mongodb://localhost:27017/toolclt';
let mongoStore = require("connect-mongo")(session);

let app = express();

// 设置views路径和模板
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/dist')));

// session持久化存储mongodb数据库
app.use(session({
    secret: "toolclt",
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1800000,
        httpOnly: true,
    },
    store: new mongoStore({
        url: DB_URL,
        collection: "sessions"
    })
}));

//引入路由接口
var loginFunction = require('./router/login.js');

//权限控制
app.get('/', function (req, res) {
    if (!req.session.user) {
        res.render('user');
    }
    else {
        res.render('index');
    }
});

//登陆操作
app.post('/tool/userlogin', loginFunction);

//注销操作
app.get('/tool/userexit', function (req, res) {
    delete req.session.user;
    res.redirect('/');
});

app.get('*', function (req, res) {
    res.render('404');
})

app.listen('7777');