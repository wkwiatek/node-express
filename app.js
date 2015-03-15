var express = require('express');
var session = require('express-session');
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: 'grumpy cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  if(req.session.views > -1) {
    req.session.views += 1;
  }
  else {
    req.session.views = 0;
  }
  next();
});

app.use(function (req, res, next) {
  console.log('Time:', new Date().toISOString());
  next();
});

require('./passport/init')(passport, LocalStrategy);
app.use('/', require('./routes/index')(passport));

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('App is listening at http://%s:%s', host, port);

});