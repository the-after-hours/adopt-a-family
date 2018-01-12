const routes = require('express').Router();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Possibly move these imports into sub files when each api route has it's own js file
const mongoose = require('mongoose');
// const Donor = require('../models/donor');
// const Family = require('../models/family');

mongoose.connect('mongodb://localhost/aaf_local');

app.use(bodyParser.json());

// Configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// All of these route are relative to /api/

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'You have hit the API.' });
});

routes.get('/pairing', (req, res) => {
  res.status(200).json({
    message: 'hooray! pairing route!',
    donor: { name: 'bob' },
    family: { name: 'bill' }
  });
});

module.exports = routes;
