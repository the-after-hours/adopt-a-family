const routes = require('express').Router();

// All of these route are relative to /api/

routes.get('/', (req, res) => {
  res.send('You have hit the API.');
});

module.exports = routes;