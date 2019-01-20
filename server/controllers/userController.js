const User = require('../models/user');
const Donor = require('../models/donor');
const Family = require('../models/family');
const Organizer = require('../models/organizer');
const Name = require('../models/name');
const passport = require('passport');
const ACCOUNT_TYPES = require('../constants/accountTypes');

exports.signUp = (req, res) => {
  console.log(req.body);
  const {
    firstName,
    middleInitial,
    lastName,
    address,
    accountType,
    email,
    password,
  } = req.body;

  const queryForExistingUser = User.findOne({ email: email });

  queryForExistingUser
    .exec((error, user) => {
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

        const nameSchema = new Name({
          first: firstName,
          middle: middleInitial,
          last: lastName,
        });

        let accountTypeSchema;
        switch (accountType) {
          case ACCOUNT_TYPES.ORGANIZER:
            accountTypeSchema = new Organizer({
              name: nameSchema,
              organization,
            });
          case ACCOUNT_TYPES.DONOR:
            accountTypeSchema = new Donor({
              name: nameSchema,
              budget,
            });
          case ACCOUNT_TYPES.FAMILY:
          default:
            // Default to family account since it has the least power
            accountTypeSchema = new Family({
              name: nameSchema,
            });
        }

        const newUser = new User({
          local: {
            name: nameSchema,
            address,
            accountType: accountTypeSchema,
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
          });
        });
      }
    })
    .catch((error) => {
      console.error(error);
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
