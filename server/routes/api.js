const routes = require('express').Router();
const bodyParser = require('body-parser');

// Possibly move these imports into sub files when each api route has it's own js file
const mongoose = require('mongoose');
const Donor = require('../models/donor');
const Family = require('../models/family');
const Wishlist = require('../models/wishlist');

const donorController = require('../controllers/donorController');

mongoose.connect('mongodb://localhost/aaf');

// Configure app to use bodyParser()
// this will let us get the data from a POST
routes.use(bodyParser.urlencoded({ extended: true }));
routes.use(bodyParser.json());

// All of these route are relative to /api/

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'You have hit the API.' });
});

// We are building Donors (those with goods) looking for families
routes.get('/pairing', (req, res) => {
  if (
    typeof req.query.budget === 'undefined' ||
    req.query.budget === 'null' ||
    req.query.budget === 'undefined'
  ) {
    res.status(400).json({ message: 'Missing Budget Param' });
  } else {
    let budget = parseInt(req.query.budget);
    // An Orginization/Organizer calls this by passing FAMILY (wildcard invalid) and Budget
    // it returns a list of donors with matching Family.wishlist.cost === Donor.budget +/- 10% [max $20, future implement] (from here on called 'budget')
    // list is ordered in ascending order
    // e.g. Family.wishlist.cost = 100 +/- 10%
    // sorted list: 90, 95, 98, 99, 101, 102, 110
    let maxBudget = budget * 1.1;
    let minBudget = budget * 0.9;

    Donor.where('budget')
      .gte(minBudget)
      .lte(maxBudget)
      .where('matchedFamily', null)
      // .populate('name') // Populate function is not working right now.. need to figure it out
      .sort({ budget: 1 }) // Take the donors found and sort budgets from lowest to highest
      .exec((err, donors) => {
        if (err) {
          console.error(err);
          // Handle this better later
          res.status(500).json({ message: err });
        } else {
          // Take the donors and provide appropriate message if no donors were found
          if (donors.length === 0) {
            res.status(200).json({
              message: 'No donors were found',
              donors: donors,
            });
          } else {
            res.status(200).json({
              message: 'Donors were found',
              donors: donors,
            });
          }
        }
      });
  }
});

routes.get('/pairing/balance', (req, res) => {
  // This route is for finding the left over amount total (sum of all families money used)
  // total = Money in org account (this can go up or down)
  // spent = Cost of all wishlists associated with an org
  // balance = total-spent

  // The entire code snippet below probably needs to be reworked. right now it's just mapping out the logic
  // this is pseudo code that assumes (1) we can sum the response and (2) organizer name is passed as the request
  let money = {
    total: Math.sum(Donor.budget.where('organizer', req.params.organizer)),
    spent: Math.sum(
      Family.wishlist.totalListCost.where('organizer', req.params.organizer)
    ), // This needs to use Family.readWishlist() probably
    balance: total - spent,
  };

  if (err) {
    console.error(err);
    res.status(500).json({ message: err });
  } else {
    res.status(200).json({ money });
  }
});

routes.get('/pairing/paired', (req, res) => {
  // Return list of donors and families associated with the current organizer

  res.status(200).json({
    org1: {
      families: ['a', 'b', 'c'],
      budget: {
        // Comes from mongoDB, same as /paring/balance
        total: '50',
        spent: '29',
        balance: '21',
      },
    },
    org2: {
      families: ['x', 'y', 'z'],
      budget: {
        // Comes from mongoDB, same as /paring/balance
        total: '50',
        spent: '29',
        balance: '21',
      },
    },
  });
});

routes.get('/wishlist/:familyId', (req, res) => {
  const { familyId } = req.params;
  // This regex checks if the family ID matches the parameters for an object ID
  // 0-9 a-f and a length of 24
  if (!familyId.match(/[0-F]{24}/gi)) {
    res.status(400).json({ message: 'Invalid family id' });
  } else {
    Wishlist.find({ family: familyId }).exec((err, wishlist) => {
      if (err) {
        res.status(500).json(err);
      } else {
        if (wishlist.length === 0) {
          // Double quotes don't play well with editorconfig
          // eslint-disable-next-line
          res.status(404).json({ message: "There's no family with that ID" });
        } else if (wishlist[0].list.length === 0) {
          res
            .status(200)
            .json({ message: 'Family exists but has no wishlist' });
        } else {
          res.status(200).json({
            message: 'Wishlist found!',
            wishlist: wishlist[0].list,
          });
        }
      }
    });
  }
});

// This route will only accept 0 query params or exactly 2: filter and value
routes.get('/families', (req, res) => {
  const { filter, value } = req.query;
  const queryKeys = Object.keys(req.query);

  if (queryKeys.length === 0) {
    const query = Family.find();

    query
      .exec()
      .then(families => {
        res.status(200).json({ families });
      })
      .catch(err => {
        res.status(500).json({
          message: err,
        });
      });
  } else if (queryKeys.length !== 2) {
    // Throw 400 if incorrect number of parameters received
    res.status(400).json({
      message: `Received ${queryKeys.length} parameter(s) but expected 2.`,
    });
  } else if (!filter || !value) {
    // Throw 400 if there are queries that are not filter/value
    res.status(400).json({
      message: 'Invalid parameters supplied.',
    });
  } else {
    const query = Family.find({ filter: value });

    query
      .exec()
      .then(families => {
        res.status(200).json({
          families,
        });
      })
      .catch(err => {
        res.status(500).json({
          message: err,
        });
      });
  }
});

// This route will only accept 0 query params
routes.get('/donors', donorController.showAll);

// Accepts one param and one query only
// eg /donors/_id?value=123
// Returns array of donors matching
routes.get('/donors/:filter', donorController.filterBySingleValue);

module.exports = routes;
