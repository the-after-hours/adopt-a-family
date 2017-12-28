const mongoose = require('mongoose');
const remoteDatabaseURL =
  'mongodb://phvc:phvc@ds040877.mlab.com:40877/phvc-test';
const Donor = require('./models/donor');
const Family = require('./models/family');
const Name = require('./models/name');
const Organizer = require('./models/organizer');
const User = require('./models/user');
const Wishlist = require('./models/wishlist');

mongoose.connect(remoteDatabaseURL, {
  useMongoClient: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));
