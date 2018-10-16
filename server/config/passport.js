const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(
  'local-signup',
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true, //allows us to pass back the entire request to the callback
  }),
  function(req, email, password, done) {
    const query = User.findOne({ email });

    query.exec((err, user) => {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, false, {
          message: `There is alread a user with email: ${email}`,
        });
      } else {
        const newUser = new User({
          local: {
            email,
            password,
          },
        });

        return done(null, user);
      }
    });
  }
);
