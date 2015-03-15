var express = require('express');
var router = express.Router();
var Q = require('q');
var request = Q.denodeify(require('request'));

var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

module.exports = function (passport) {

  router.get('/', function (req, res) {
    if (req.session.views) {
      res.send('Welcome back!');
    }
    else {
      res.send('Welcome!');
    }
  });

  router.get('/login', function (req, res) {
    res.render('login');
  });

  router.post('/login', passport.authenticate('local', {
    successRedirect: '/songs',
    failureRedirect: '/'
  }));

  router.post('/signup', function (req, res) {
    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });

  router.get('/signout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  router.get('/songs', isAuthenticated, function (req, res, next) {
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

  return router;
}