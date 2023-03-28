import bodyParser from 'body-parser';
import express from 'express';

import rootRoutes from './routes/root.js';
import apiRoutes from './routes/api.js';

const app = express();
const port = process.env.PORT || 3005;
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

app.use('/', rootRoutes);
app.use('/api', apiRoutes);

app.listen(port, () => console.log(`Listening on port ${port}!`));
