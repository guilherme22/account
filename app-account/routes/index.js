var routes = exports;
// setup function for routes
routes.setup = require('./setup');
// application 
routes.app = {};
routes.app.index = require('./app');
routes.app.login = require('./app/login');
routes.app.register = require('./app/register');
routes.app.register.index = require('./app/register.index.js');
routes.app.logout = require('./app/logout');
