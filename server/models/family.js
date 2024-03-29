import mongoose from 'mongoose';

import Wishlist from './wishlist.js';

const Schema = mongoose.Schema;
const familySchema = new Schema({
  name: {
    // Head of household name is fine
    type: Schema.Types.ObjectId,
    ref: 'Name',
    required: true,
  },
  wishlist: {
    type: Schema.Types.ObjectId,
    ref: 'Wishlist',
  },
  size: Number,
  sponsor: {
    type: Schema.Types.ObjectId,
    ref: 'Donor',
    default: null,
  },
  organizer: {
    type: Schema.Types.ObjectId,
    ref: 'Organizer',
    default: null,
  },
});

familySchema.methods.createWishlist = function() {
  const wishlist = new Wishlist();

  wishlist.save(function(err) {
    if (err) console.log(err);
  });
};

familySchema.methods.readWishlist = function() {
  return Wishlist.findOne({ Family: this._id }, function(err, wishlist) {
    if (err) {
      console.log(err);
    } else {
      return wishlist;
    }
  });
};

// TODO: Delete wishlist, addItem, removeItem, updateItem

const Family = mongoose.model('Family', familySchema);

export default Family;
