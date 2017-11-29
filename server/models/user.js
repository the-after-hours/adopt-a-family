const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const saltRounds = 10;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: { unique: true }
  },
  name: {
    type: Schema.Types.ObjectId,
    ref: 'Name',
    required: true
  },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: String,
  // Check below fields, if present, user is of that type
  _donor: {
    type: Schema.Types.ObjectId,
    ref: 'Donor'
  },
  _family: {
    type: Schema.Types.ObjectId,
    ref: 'Family'
  },
  _organizer: {
    type: Schema.Types.ObjectId,
    ref: 'Organizer'
  }
});

// Hash password before saving
userSchema.pre('save', next => {
  bcrypt.hash(this.password, saltRounds, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

// Compare entered password with the hash stored in User
userSchema.methods.comparePassword = function(password, cb) {
  return bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// TODO: Logout

const User = mongoose.model('User', userSchema);

module.exports = User;
