const mongoose = require('mongoose');
const Donor = require('./models/donor');
const Family = require('./models/family');
const dbUrl = require('./config/database');
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
      wishlist: [
        {
          itemName: 'Backpack',
          itemQuantity: 1,
          itemCost: 40,
        },
        {
          itemName: 'Notebook',
          itemQuantity: 5,
          itemCost: 3,
        },
        {
          itemName: 'Mechanical Pencil Pack',
          itemQuantity: 5,
          itemCost: 8,
        },
      ],
    },
  },
  {
    username: 'subparmoms',
    name: {
      first: 'Ella',
      middle: 'Gots',
      last: 'Grooved',
    },
    email: 'test1@test.com',
    password: 'pasword',
    phone: '666-666-6666',
    userType: FAMILY,
    userOptions: {
      size: 4,
      wishlist: [],
    },
  },
];

console.log(dbUrl);
mongoose.connect(
  dbUrl,
  {
    useMongoClient: true,
  }
);

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
  let newWishlist;

  if (wishlist) {
    newWishlist = new Wishlist({ list: wishlist });
  }

  const newFamily = new Family({
    name: headOfFamilyNameModel,
    wishlist: newWishlist._id,
    size,
  });

  // Tried to set this to just newFamily
  // But it will cause a stack overflow
  newWishlist.family = newFamily._id;

  await Promise.all([newFamily.save(), newWishlist.save()])
    .then((arr) => {
      console.log(`Successfully created family: ${newFamily}`);
      console.log(`Successfully created wishlist: ${newWishlist}`);
    })
    .catch((err) => {
      console.error(`Error creating family or wishlist: ${err}`);
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
    local: {
      username,
      name: nameModel._id,
      email,
      password,
      phone,
      userType,
    },
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
      userFields.local._family = familyModel;
      break;
    case DONOR:
      const donorModel = await donorCreate(
        nameModel,
        userOptions.budget,
        name.matchedFamily
      );
      userFields.local._donor = donorModel;
      break;
    case ORGANIZER:
      const organizerModel = await organizerCreate(
        nameModel,
        userOptions.organization
      );
      userFields.local._organizer = organizerModel;
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
    MOCK_USERS.map(async (user) => {
      await userCreate(...Object.values(user));
    })
  );

  await db.close();

  console.log('****************************************');
  console.log('     Database successfully seeded.');
  console.log('****************************************');
};

seedDB();
