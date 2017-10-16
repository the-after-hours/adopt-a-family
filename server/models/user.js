const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const userSchema = mongoose.Schema({
  local: {
    username: String,
    email: String,
    password: String
  }
});

// Generating a hash
userSchema.methods.generateHash = password => {
  return bcrypt.hash(password, saltRounds, function (err, hash) {
    if (err) {
      console.log('There was an error: ', err);
    } else {
      return hash;
    }
  });
};

// Compare entered password with the hash stored in User
userSchema.methods.validPassword = password => {
  return bcrypt.compare(password, this.local.password, (err, res) => {
    if (err) {
      console.log('There was an error: ', err);
    } else {
      return res;
    }
  });
};

module.exports = mongoose.model('User', userSchema);