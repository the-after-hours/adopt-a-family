const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const userSchema = new mongoose.Schema({
  local: {
    username: {
      type: String,
      required: true,
      index: { unique: true }
    },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: String
  }
});

// Hash password before saving
userSchema.pre('save', (next) => {
  bcrypt.hash(this.password, saltRounds, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

// Compare entered password with the hash stored in User
userSchema.methods.comparePassword = (password, cb) => {
  return bcrypt.compare(password, this.local.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// TODO: Logout

module.exports = mongoose.model('User', userSchema);