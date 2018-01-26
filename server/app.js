const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3005;
const indexRoutes = require('./routes');
const apiRoutes = require('./routes/api');

// Eventually we will need to refer to the build folder for production
// It would look like:
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
}

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use('/', indexRoutes);
app.use('/api', apiRoutes);

// I don't like setting this to module exports just to make the tests work.. possible work around anyone?
module.exports = app.listen(port, () =>
  console.log(`Listening on port ${port}!`)
);
