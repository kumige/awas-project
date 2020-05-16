const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const app = express()
const port = 3000

const routes = require('./routes/router')

app.use(express.static(__dirname + '/public/'));
//app.use(express.static(__dirname + '/db/'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(require('cookie-parser')());
app.use(require('express-session')({
    secret: 'lalalala',
    resave: true,
    saveUninitialized: true
  }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))