function routesSetupHandler(app, routes) {
  // application
  app.get('/', routes.app.index);
  app.post('/login', routes.app.login);
  app.get('/register', routes.app.register.index);
  app.post('/register', routes.app.register);
  app.get('/logout', routes.app.logout);
}
module.exports = exports = routesSetupHandler;
