const User = require('../models/user');
const passport = require('passport');

exports.signUp = (req, res) => {
  console.log(req);
  const {
    firstName,
    middleInitial,
    lastName,
    address,
    accountType,
    email,
    password,
  } = req.body;

  const queryForExistingUser = User.findOne({ email });

  queryForExistingUser.exec((error, user) => {
    if (error) {
      return res.status(500).json({
        error: error,
        message: 'Error while trying to find pre-existing user.',
      });
    } else if (user) {
      res.json({
        message: `Sorry, there is already a user with the email ${email}`,
      });
    } else {
      // Ok to create the new user
      const newUser = new User({
        local: {
          firstName,
          middleInitial,
          lastName,
          address,
          accountType,
          email,
          password,
        },
      });

      newUser.save((error, savedUser) => {
        if (error) {
          return res.status(500).json({
            error,
            message: 'Error while attempting to save new user.',
          });
        }

        res.status(200).json({
          message: 'Successfully created new user.',
          savedUser,
        });
      });
    }
  });
};

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.redirect('/login');
    }

    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.redirect('/users/' + user.username);
    });
  });
};
