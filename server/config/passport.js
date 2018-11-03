const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

/**
 * Container function for passport configs
 * Imported and called in server/app.js and given the param passport
 * @param passport Passport module
 */
module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  /**
   * Configures the local auth strategy, ie, the one where users are authenticated via our own DB
   */
  passport.use(
    new LocalStrategy(
      {
        // Declare custom usernameField and passwordField labels
        usernameField: 'email',
        passwordField: 'password',
      },
      // Authentication callback
      function(email, password, done) {
        const query = User.findOne({ email });

        query.exec((err, user) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, {
              message: `There is no registered user with email: ${email}`,
            });
          }
          if (!user.isValidPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
        });
      }
    )
  );
};
