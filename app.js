var express = require('express');
var session = require('express-session');
var Q = require('q');
var request = Q.denodeify(require('request'));
var app = express();

app.use(session({
  secret: 'grumpy cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

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

app.get('/', function (req, res) {
  if (req.session.views) {
    res.send('Welcome back!');
  }
  else {
    res.send('Welcome!');
  }
});

app.get('/songs', function (req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res) {

  var metallicaTracksResponse = request('http://api.soundcloud.com/tracks.json?q=Metallica&client_id=288c3b51bc9cfb269d1a89d92e4196a3');
  var queenTracksResponse = request('http://api.soundcloud.com/tracks.json?q=Queen&client_id=288c3b51bc9cfb269d1a89d92e4196a3');

  Q.all([
    metallicaTracksResponse,
    queenTracksResponse
  ]).then(function(responses) {
    var allTracks = {
      Metallica: JSON.parse(responses[0].body),
      Queen: JSON.parse(responses[1].body)
    };
    res.json(allTracks);
  });
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('App is listening at http://%s:%s', host, port);

});