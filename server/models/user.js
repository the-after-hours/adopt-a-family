const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const ACCOUNT_TYPES = require('../constants/accountTypes');

const saltRounds = 10;

const userSchema = new Schema({
  local: {
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    name: {
      type: Schema.Types.ObjectId,
      ref: 'Name',
      required: true,
    },
    phone: String,
    address: String,
    // accountType: { type: String, required: true },
    // Check below fields, if present, user is of that type
    _donor: {
      type: Schema.Types.ObjectId,
      ref: ACCOUNT_TYPES.DONOR,
    },
    _family: {
      type: Schema.Types.ObjectId,
      ref: ACCOUNT_TYPES.FAMILY,
    },
    _organizer: {
      type: Schema.Types.ObjectId,
      ref: ACCOUNT_TYPES.ORGANIZER,
    },
  },
  facebook: {
    id: String,
    token: String,
    name: String,
    email: String,
  },
  twitter: {
    id: String,
    token: String,
    displayName: String,
    username: String,
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String,
  },
});

// Hash password before saving
userSchema.pre('save', function(next) {
  bcrypt.hash(this.local.password, saltRounds, (err, hash) => {
    if (err) return next(err);
    this.local.password = hash;
    next();
  });
});

// Compare entered password with the hash stored in User
// Async recommended since it will be less CPU intensive
userSchema.methods.isValidPassword = async function(password) {
  return await bcrypt.compareSync(password, this.local.password);
};

// TODO: Logout

const User = mongoose.model('User', userSchema);

module.exports = User;
