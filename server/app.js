const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3005;
const indexRoutes = require('./routes');
const apiRoutes = require('./routes/api');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

// Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
}

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
// require('./config/passport')(passport); // pass passport for configuration
// required for passport
app.use(
  session({
    secret: 'phuc-change-this-later-pls?',
    resave: false, // will not resave to the session store unless the session is modified
    saveUnitialized: false, // will not save session unless modified
  })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use('/', indexRoutes);
app.use('/api', apiRoutes);

app.listen(port, () => console.log(`Listening on port ${port}!`));
