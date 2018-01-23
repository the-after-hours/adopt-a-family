const routes = require('express').Router();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Possibly move these imports into sub files when each api route has it's own js file
const mongoose = require('mongoose');
const Donor = require('../models/donor');
const Family = require('../models/family');
// wishlist = Family.readWishlist();
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

// we are building Donors (those with goods) looking for families
routes.get('/pairing', (req, res) => {
  // an Orginization/Organizer calls this by passing FAMILY (wildcard invalid) and Budget
  // it returns a list of donors with matching Family.wishlist.cost === Donor.budget +/- 10% [max $20, future implement] (from here on called 'budget')
  // list is ordered with closest match (below target budget) then highest ones
  // SPECIAL SORT RULE: First we will sort budget <= Family.wishlist.cost in DESCENDING then we will sort budget >= Family.wishlist.cost in ASCENDING order
  // e.g. Family.wishlist.cost = 100 +/- 10%
  // sorted list: 99, 98, 95, 90, 101, 102, 110
  let maxBudget = req.params.budget*1.1;
  let minBudget = req.params.budget*0.9;

  Donor
    .where('budget').gte(minBudget).lte(maxBudget)
    .where('matchedFamily', 'unmatched')
    .sort({ 'budget': -1 }) // take the donors found and sort budgets from highlest to lowest (ignores special rule)
    .exec((err, donors) => {
      if(err) {
        console.error(err);
        // handle this better later
        res.status(500).json({ message: err });
      }
      else {
        // take the donors response and splice it at the value where it goes over/under budget
        res.status(200).json({
          message: 'Donors were found',
          donors: donors
        });
      }
    });
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
    spent: Math.sum(Family.wishlist.totalListCost.where('organizer', req.params.organizer)), // this needs to use Family.readWishlist() probably
    balance: total-spent
  };

  if(err){
    console.error(err);
    res.status(500).json({ message: err });
  }
  else {
   res.status(200).json({ money });
  }
});

routes.get('/pairing/paired', (req, res) => {
  // Return list of donors and families associated with the current organizer

  res.status(200).json({
    org1: {
      families: ['a','b','c'],
      budget: { // comes from mongoDB, same as /paring/balance
        total: '50',
        spent: '29',
        balance: '21'
      }
    },
    org2: {
      families: ['x','y','z'],
      budget: { // comes from mongoDB, same as /paring/balance
        total: '50',
        spent: '29',
        balance: '21'
      }
    }
  });
});

module.exports = routes;
