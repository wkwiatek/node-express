var express = require('express');
var request = require('request');
var app = express();

app.use(function (req, res, next) {
  console.log('Time:', new Date().toISOString());
  next();
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/songs', function (req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res) {

  request('http://api.soundcloud.com/tracks.json?q=Metallica&client_id=288c3b51bc9cfb269d1a89d92e4196a3', function(err, response, body) {
    if (!err && response.statusCode == 200) {
      res.json(JSON.parse(body));
    }
  });

});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('App is listening at http://%s:%s', host, port);

});