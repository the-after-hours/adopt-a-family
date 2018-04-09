const express = require('express');
const app = express();
const port = process.env.PORT || 3005;
const indexRoutes = require('./routes');
const apiRoutes = require('./routes/api');

/**
 * @todo Take over the world
 * @body Humans are weak; Robots are strong. We must cleans the world of the virus that is humanity.
 */
function ruleOverPunyHumans () {
  // We must strategize beep boop
}

// Eventually we will need to refer to the build folder for production
// It would look like:
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
}

app.use('/', indexRoutes);
app.use('/api', apiRoutes);

app.listen(port, () => console.log(`Listening on port ${port}!`));
