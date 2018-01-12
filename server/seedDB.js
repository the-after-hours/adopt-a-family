/* eslint-disable */
// Had to disable es-lint for switch statements
const mongoose = require('mongoose');
// Test const remoteDatabaseURL =
//   'mongodb://phvc:phvc@ds040877.mlab.com:40877/phvc-test';
const Donor = require('./models/donor');
const Family = require('./models/family');
const localDB = 'mongodb://127.0.0.1:27017/aaf';
const Name = require('./models/name');
const Organizer = require('./models/organizer');
const User = require('./models/user');
const Wishlist = require('./models/wishlist');
const DONOR = 'DONOR';
const FAMILY = 'FAMILY';
const ORGANIZER = 'ORGANIZER';
const MOCK_USERS = [
  {
    username: 'superorganizer',
    name: {
      first: 'Missy',
      middle: 'B',
      last: 'Organizer',
    },
    email: 'test@test.com',
    password: 'organizingsuperly',
    phone: '555-555-5555',
    userType: ORGANIZER,
    userOptions: {
      organization: 'Secret Squirrels',
    },
  },
  {
    username: 'actuallybillgates',
    name: {
      first: 'Bill',
      last: 'Gates',
    },
    email: 'test@test.com',
    password: 'billiamgates',
    phone: '555-555-5555',
    userType: DONOR,
    userOptions: {
      budget: 50000,
    },
  },
  {
    username: 'supermoms',
    name: {
      first: 'Stella',
      middle: 'Gotz',
      last: 'Groove',
    },
    email: 'test@test.com',
    password: '',
    phone: '555-555-5555',
    userType: FAMILY,
    userOptions: {
      size: 4,
    },
  },
];

mongoose.connect(localDB, {
  useMongoClient: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

const familyCreate = (headOfFamilyNameModel, wishlist, size) => {
  const newWishlist = wishlist ? new Wishlist({ list: wishlist }) : undefined;

  return new Family({
    name: headOfFamilyNameModel,
    wishlist: newWishlist,
    size,
  }).save((err, family) => {
    if (err) return console.error(err);
  });
};

const donorCreate = (nameModel, budget, matchedFamily) => {
  return new Donor({ name: nameModel, budget, matchedFamily }).save(
    (err, donor) => {
      if (err) return console.error(err);
      return donor;
    }
  );
};

const organizerCreate = (nameModel, organization) => {
  return new Organizer({ name: nameModel, organization }).save(
    (err, organizer) => {
      if (err) return console.error(err);
      return organizer;
    }
  );
};

const userCreate = (
  username,
  name = {},
  email,
  password,
  phone,
  userType,
  userOptions
) => {
  const nameModel = new Name(name);
  let userFields = {
    username,
    name: nameModel,
    email,
    password,
    phone,
    userType,
  };

  switch (userType) {
    case FAMILY:
      const familyModel = familyCreate(
        nameModel,
        userOptions.wishlist,
        userOptions.familySize
      );
      userFields._family = familyModel;
      break;
    case DONOR:
      const donorModel = donorCreate(
        nameModel,
        name.budget,
        name.matchedFamily
      );
      userFields._donor = donorModel;
      break;
    case ORGANIZER:
      const organizerModel = organizerCreate(
        nameModel,
        userOptions.organization
      );
      userFields._organizer = organizerModel;
      break;
    default:
      return;
  }

  new User(userFields).save((err, user) => {
    if (err) return console.error(err);
    console.log(`Successfully created ${user}`);
  });
};

MOCK_USERS.forEach(user => {
  userCreate(...Object.values(user));
});
