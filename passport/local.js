module.exports = function (passport, LocalStrategy) {
  passport.use(new LocalStrategy(
    function(username, password, done) {
      return done(null, {
        _id: 123,
        username: username,
        password: password
      });
    })
  );
};