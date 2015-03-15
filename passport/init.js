var local = require('./local');

module.exports = function (passport, LocalStrategy) {

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  local(passport, LocalStrategy);
};