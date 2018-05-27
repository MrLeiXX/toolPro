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

// 访问需要账号密码权限
app.get('/', function (req, res) {
    if (!req.session.user) {
        res.render('user');
    }
    else {
        res.render('index');
    }
});

app.listen('7777');