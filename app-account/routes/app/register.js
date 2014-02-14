var User = require('../../models/user').Model;
var debug = require('debug')('workday');

function appRegisterHandler(req, res, next) {
  debug('app register handler');
  var pivot = req.body;
  var user = new User(pivot);

  function successHandler() {
    debug('success handler');
    res.redirect('/');
  }

  function failHandler() {
    debug('fail handler');
    res.redirect('/register');
  }

  function userSaveHandler(err, result) {
    debug('user save handler');
    if (!err && result) {
      successHandler();
    } else {
      failHandler();
    }
  }
  user.save(userSaveHandler);
}
module.exports = exports = appRegisterHandler;
