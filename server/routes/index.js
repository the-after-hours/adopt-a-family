import express from 'express';

const routes = express.Router();

// Routes relative to root

routes.get('/', (req, res) => {
  res.send('You have hit the backend root!');
});

export default routes;
