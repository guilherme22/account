function appLogoutHandler(req, res) {
  req.logout();
  req.session.destroy();
  res.redirect('/');
}
module.exports = exports = appLogoutHandler;
