const Donor = require('../models/donor');

exports.readWishList = (req, res) => {
  Donor.findOne({ id: req.params.id })
    .populate({
      path: matchedFamily,
      populate: { path: wishlist }
    })
    .exec((err, wishlist) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: `There was an error: ${err}` });
      }
      res.json(wishlist);
    });
};
