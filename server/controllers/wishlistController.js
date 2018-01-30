const Wishlist = require('../models/wishlist');

exports.addItem = (req, res) => {
  if (Object.keys(req.body).length === 0) return res.sendStatus(400);

  const familyId = req.body.familyId;
  const item = req.body.item;

  // Need to handle:
  //  No wishlist
  //  Missing data?
  //  what else?

  Wishlist.where({ family: familyId }).exec((err, wishlist) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: err });
    } else {
      wishlist = wishlist[0].list;
      wishlist.push(item);
      res.send(wishlist);
    }
  });
};

exports.create = (req, res) => {
  res.send('NOT YET IMPLEMENTED');
};

exports.delete = (req, res) => {
  res.send('NOT YET IMPLEMENTED');
};

exports.removeItem = (req, res) => {
  res.send('NOT YET IMPLEMENTED');
};

exports.updateItem = (req, res) => {
  res.send('NOT YET IMPLEMENTED');
};
