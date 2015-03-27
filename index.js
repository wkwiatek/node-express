var express = require('express');
var app = express();

app.set('views', 'views');
app.set('view engine', 'jade');

app.use(require('body-parser').urlencoded());
app.use(require('cookie-parser')());
app.use(require('express-session')({
  secret: 'grumpy cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 60000
  }
}));

app.use(function(req, res, next) {
  var requestCount = req.session.requestCount || 0;
  req.session.requestCount = requestCount + 1;

  next();
});

require('./app/auth')(app);

app.use(require('./app/responseTime'));
app.use(require('./app/router'));
app.use(express.static('./public'));

app.listen(process.env.PORT || 3000);