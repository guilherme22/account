var express = require('express');
var routes = require('./routes');
var context = require('./middlewares/context');
var http = require('http');
var path = require('path');
var app = express();
var server = http.createServer(app);
//var io = require('socket.io').listen(server);
var config = global.config = require('./config')(process.env.NODE_ENV);
var mongoose = require('mongoose');
var MongoStore = require('express-session-mongo');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var sessionConfiguration = { secret: 'j0urn3y-s0ul', store: new MongoStore() };
var debug = require('debug')('workday');
// models
var User = require('./models/user').Model;

mongoose.connect(config.db.host, config.db.name);

function serializeUserHandler(user, done) {
  debug('serializing user');
  debug(user);
  return done(null, user._id);
}
passport.serializeUser(serializeUserHandler);

function deserializeUserHandler(id, done) {
  debug('deserializing user');

  function userFindByIdHandler(err, result) {
    debug('user find by id handler');
    return done(err, result);
  }
  User.findById(id, userFindByIdHandler);
}
passport.deserializeUser(deserializeUserHandler);

// authentication setup
function localStrategyHandler(username, password, done) {
  debug('Local strategy handler');
  var query = { email: username };
  var out = { message: '' };
  
  function processNextTickHandler() {
    debug('processing next tick');
    function userFindOneHandler(err, result) {
      debug('user find one handler');
      if (err) {
        return done(err);
      }
      if (!result) {
        out.message = 'Usuario incorreto... tente novamente.';
        return done(null, false, out);
      }
      function comparePasswordHandler(err, isMatch) {
        debug('compare password handler');
        if (err) {
          return done(err);
        }
        if (isMatch) {
          return done(null, result);
        } else {
          out.message = 'Senha incorreta... tente novamente.';
          return done(null, false, out);
        }
      }
      result.comparePassword(password, comparePasswordHandler);
    }
    User.findOne(query, userFindOneHandler);
  }
  process.nextTick(processNextTickHandler);
}
passport.use(new LocalStrategy(localStrategyHandler));

// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(context);
//app.use(express.csrf());
app.use(express.methodOverride());
app.use(express.session(sessionConfiguration));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

// setup routes
routes.setup(app, routes);

module.exports = exports = app;
