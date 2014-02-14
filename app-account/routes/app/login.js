var passport = require('passport');
var debug = require('debug')('workday');
var util = require('util');

function appLoginHandler(req, res, next) {
  debug('app login handler');
  function userAuthenticateHandler(err, user, info) {
    debug('user authenticate handler');
    if (err) { return next(err); }
    if (!user) {
      debug('user not exists');
      return res.redirect('/');
    }
    function userLoginHandler(err) {
      debug('user login handler');
      if (err) {
        return next(err);
      }
      return res.redirect('/dashboard');
    }
    req.logIn(user, userLoginHandler);
  }
  passport.authenticate('local', userAuthenticateHandler)(req, res, next);
}
module.exports = exports = appLoginHandler;
