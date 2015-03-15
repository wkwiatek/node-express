var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/songs', function (req, res) {
  var songs = [
    { author: 'Foo Fighters', song: 'Pretender' },
    { author: 'Alter Bridge', song: 'Blackbird' }
  ];
  res.json(songs);
});

var server = app.listen(3000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('App is listening at http://%s:%s', host, port);

});