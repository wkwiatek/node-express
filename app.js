var express = require('express');
var http = require('http');
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

  http.get("http://api.soundcloud.com/tracks.json?q=Metallica&client_id=288c3b51bc9cfb269d1a89d92e4196a3", function(tracks) {
    var output = '';
    tracks.on('data', function (chunk) {
      output += chunk;
    });

    tracks.on('end', function() {
      res.json(JSON.parse(output));
    });
  }).on("error", function(e){
      console.log("Got error: "+e);
  });

});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('App is listening at http://%s:%s', host, port);

});