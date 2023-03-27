import Family from '../models/family';
import Wishlist from './wishlist';

export const readWishlist = (req, res) => {
  Family.findById(req.params.wishlist_id)
    .populate({ path: wishlist })
    .then((err, wishlist) => {
      res.json(wishlist);
    });
};

export const createWishlist = (req, res) => {
  Wishlist.create({
    family: req.body.family_id,
    list: req.body.wishlist,
  }).then((err, wishlist) => {
    if (err) console.log(err);
    res.status(200).json(wishlist);
  });
};

export const addItem = (req, res) => {
  const newItem = req.body.new_item;
  Wishlist.findByIdAndUpdate(req.body.wishlist_id, {
    $push: { list: newItem },
  }).then((err) => {
    if (err) {
      res.status(500).json({ error: `There was an error: ${err}` });
    }
  });
};

export const removeItem = (req, res) => {};

export const deleteWishlist = (req, res) => {
  Wishlist.findByIdAndRemove(req.params.wishlist_id);
};
