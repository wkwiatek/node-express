var router = require('express').Router();
var controller = require('./controller');

var isAuthenticated = function(req, res, next) {
  if(!req.user) {
    res.sendStatus(403);
  }
  else {
    next();
  }
};

router.get('/', controller.index);

router.get('/songs/:q', controller.songs);

router.get('/chat', isAuthenticated, controller.chat);

module.exports = router;