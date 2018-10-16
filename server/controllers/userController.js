const User = require('../models/user');

exports.signUp = (req, res) => {
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
        firstName,
        middleInitial,
        lastName,
        address,
        accountType,
        email,
        password,
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

exports.login = (req, res) => {};
