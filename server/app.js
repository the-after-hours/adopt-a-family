const express = require('express');
const app = express();
const port = process.env.PORT || 3005;
const indexRoutes = require('./routes');
const apiRoutes = require('./routes/api');

// Eventually we will need to refer to the build folder for production
// It would look like:
if (process.env.NODE_ENV === 'production') {
  app.use(express.static("build"));
}

app.use('/', indexRoutes);
app.use('/api', apiRoutes);

app.listen(port, () => console.log(`Listening on port ${port}!`));