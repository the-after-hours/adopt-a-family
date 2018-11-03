const routes = require('express').Router();
const login = require('userController').login;

// Routes relative to root

routes.post('/login', login);

routes.get('/', (req, res) => {
  res.send('You have hit the backend root!');
});

module.exports = routes;
