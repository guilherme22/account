var root = exports;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SALT_WORK_FACTOR = 10;
var debug = require('debug')('workday');
var bcrypt = require('bcrypt');
var validEmail = require('valid-email');

var schema = root.Schema = new Schema({
  full_name: { type: String, required: true },
  email: { type: String, required: true, unique: true, validate: [validEmail] },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now(), required: true },
  updated_at: { type: Date, default: Date.now(), required: true }
});

function preSaveHandler(next) {
  var self = this;

  if (!self.isModified('password')) {
    return next();
  }

  function genSaltHandler(err, salt) {
    if (err) { return next(); }

    function hashHandler(err, hash) {
      if (err) { return next(err); }
      self.password = hash;
      next();
    }
    bcrypt.hash(self.password, salt, hashHandler);
  }
  bcrypt.genSalt(SALT_WORK_FACTOR, genSaltHandler);
}
schema.pre('save', preSaveHandler);

function comparePasswordHandler(candidate, fn) {
  var self = this;
  fn = fn || function () {};
  function compareHandler(err, isMatch) {
    if (err) { return fn(err); }
    fn(null, isMatch);
  }
  bcrypt.compare(candidate, self.password, compareHandler);
}
schema.methods.comparePassword = comparePasswordHandler;

root.Model = mongoose.model('User', schema);
