const express = require('express');

const port = 8033;

const app = express();

const path = require('path');

const db = require('./config/mongodb')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

// const cookieParas = require('cookie-parser');

const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const session = require('express-session');

// app.use(cookieParas());

app.use(express.static('assets'));

app.use(express.static('userassets'));

app.use("/uploads", express.static(path.join(__dirname, 'uploads')));

app.use(express.urlencoded());



app.use(session({
    name: "node",
    secret: "nodecode",
    resave: false,
    saveUninitialized: false,
    // cookie: {
    //     maxAge: 100 * 60 * 60
    // }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/', require('./router/adminrouter'));

app.listen(port, (err) => {
    if (err) {
        console.log(err)
        return false
    }
    console.log("server is runing", port)
});