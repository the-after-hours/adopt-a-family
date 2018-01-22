const mongoose = require('mongoose');
const Donor = require('./models/donor');
const Family = require('./models/family');
const localDB = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/aaf';
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
    password: 'password',
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

// Set mongoose promises to use Node native Promise
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

async function clearDatabase() {
  // Clear any existing entries in the database
  await Donor.remove({}, (err, p) => {
    if (err) {
      console.error(`Error deleting Donors. Error: ${err}`);
    }
    console.log(`Successfully deleted ${p} Donors`);
  });
  await Family.remove({}, (err, p) => {
    if (err) {
      console.error(`Error deleting Families. Error: ${err}`);
    }
    console.log(`Successfully deleted ${p} Families`);
  });
  await Name.remove({}, (err, p) => {
    if (err) {
      console.error(`Error deleting Names. Error: ${err}`);
    }
    console.log(`Successfully deleted ${p} Names`);
  });
  await Organizer.remove({}, (err, p) => {
    if (err) {
      console.error(`Error deleting Organizers. Error: ${err}`);
    }
    console.log(`Successfully deleted ${p} Organizers`);
  });
  await User.remove({}, (err, p) => {
    if (err) {
      console.error(`Error deleting Users. Error: ${err}`);
    }
    console.log(`Successfully deleted ${p} Users`);
  });
  await Wishlist.remove({}, (err, p) => {
    if (err) {
      console.error(`Error deleting Wishlist. Error: ${err}`);
    }
    console.log(`Successfully deleted ${p} Wishlist`);
  });
}

const familyCreate = async (headOfFamilyNameModel, wishlist, size) => {
  const newWishlist = wishlist ? new Wishlist({ list: wishlist }) : undefined;

  const newFamily = new Family({
    name: headOfFamilyNameModel,
    wishlist: newWishlist,
    size,
  });

  await newFamily.save((err, family) => {
    if (err) {
      console.log(`Error creating family: ${err}`);
      return;
    }

    console.log(`Successfully created family: ${family}`);
  });

  return newFamily;
};

const donorCreate = async (nameModel, budget, matchedFamily) => {
  const newDonor = new Donor({ name: nameModel, budget, matchedFamily });

  await newDonor.save((err, donor) => {
    if (err) {
      console.log(`Error creating donor: ${err}`);
      return;
    }

    console.log(`Successfully created donor: ${donor}`);
  });
  return newDonor;
};

const organizerCreate = async (nameModel, organization) => {
  const newOrganizer = new Organizer({ name: nameModel, organization });

  await newOrganizer.save((err, organizer) => {
    if (err) {
      console.log(`Error creating organizer: ${err}`);
      return;
    }

    console.log(`Successfully created organizer: ${organizer}`);
  });
  return newOrganizer;
};

/*
  Make the users based on MOCK_USERS
  Creates references to family, donor, or organizer as needed to determine user type
*/
const userCreate = async (
  username,
  name = {},
  email,
  password,
  phone,
  userType,
  userOptions
) => {
  const nameModel = new Name(name);

  await nameModel.save((err, name) => {
    if (err) {
      console.error(`Error creating Name: ${err}`);
      return;
    }
    console.log(`Successfully created name: ${name}`);
  });

  let userFields = {
    username,
    name: nameModel,
    email,
    password,
    phone,
    userType,
  };

  /* eslint-disable */
  // Had to disable es-lint for switch statements
  switch (userType) {
    case FAMILY:
      const familyModel = await familyCreate(
        nameModel,
        userOptions.wishlist,
        userOptions.familySize
      );
      userFields._family = familyModel;
      break;
    case DONOR:
      const donorModel = await donorCreate(
        nameModel,
        userOptions.budget,
        name.matchedFamily
      );
      userFields._donor = donorModel;
      break;
    case ORGANIZER:
      const organizerModel = await organizerCreate(
        nameModel,
        userOptions.organization
      );
      userFields._organizer = organizerModel;
      break;
    default:
      return;
  }
  // eslint-enable

  await new User(userFields).save((err, user) => {
    if (err) {
      console.error(`Error creating user with error: ${err}`);
      return;
    }
    console.log(`Successfully created user: ${user}`);
  });
};

const seedDB = async () => {
  await clearDatabase();
  await Promise.all(
    MOCK_USERS.map(async user => {
      await userCreate(...Object.values(user));
    })
  );

  await db.close();

  console.log('****************************************');
  console.log('     Database successfully seeded.');
  console.log('****************************************');
};

seedDB();
