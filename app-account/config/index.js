function configSetupHandler(env) {
  env = (env || (process.env.NODE_ENV || ('development')));
  var out = {
    development: {
      db: require('./db/development'),
    },
    production: {
      db: require('./db/production')  
    },
  };

  return out[env];
}
module.exports = exports = configSetupHandler;
