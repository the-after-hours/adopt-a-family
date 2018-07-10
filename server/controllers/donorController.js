const Donor = require('../models/donor');
const mongoose = require('mongoose');

exports.readWishList = (req, res) => {
  Donor.findOne({ id: req.params.id })
    .populate({
      path: matchedFamily,
      populate: { path: wishlist },
    })
    .exec((err, wishlist) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: `There was an error: ${err}` });
      }
      res.json(wishlist);
    });
};

exports.showAll = (req, res) => {
  const queryKeys = Object.keys(req.query);

  if (queryKeys.length === 0) {
    const query = Donor.find();

    query
      .exec()
      .then(donors => {
        res.status(200).json({ donors });
      })
      .catch(err => {
        res.status(500).json({ message: err });
      });
  } else {
    // Throw 400 if incorrect number of parameters received
    res.status(400).json({
      message: `Received ${queryKeys.length} parameter(s) but expected 0.`,
    });
  }
};

exports.filterBySingleValue = (req, res) => {
  const { value } = req.query;
  const { filter } = req.params;
  const queryKeys = Object.keys(req.query);

  if (queryKeys.length !== 1) {
    // Throw 400 if incorrect number of parameters received
    res.status(400).json({
      message: `Received ${queryKeys.length} parameter(s) but expected 1.`,
    });
  } else if (filter === '_id') {
    const convertedId = mongoose.Types.ObjectId(value);
    const isValidId = mongoose.Types.ObjectId.isValid(convertedId);
    if (!isValidId) {
      res.status(422).json({
        message: 'Invalid objectId.',
      });
    }

    const query = Donor.find(convertedId);

    query
      .exec()
      .then(donors => {
        if (!donors) {
          return res.status(400).json({
            message: 'No donors found.',
          });
        }

        return res.status(200).json({
          donors: [...donors],
        });
      })
      .catch(err => {
        res.status(500).json({
          message: err,
        });
      });
  }
};
