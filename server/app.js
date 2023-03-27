import express from 'express';
const app = express();
import bodyParser from 'body-parser';
const port = process.env.PORT || 3005;
import indexRoutes from './routes';
import apiRoutes from './routes/api';

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

app.listen(port, () => console.log(`Listening on port ${port}!`));
