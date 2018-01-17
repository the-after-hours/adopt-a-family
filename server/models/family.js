const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Wishlist = require('./wishlist');

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
    required: true,
  },
  size: Number,
  sponsor: {
    type: Schema.Types.ObjectId,
    ref: 'Donor',
    default: 'unmatched'
  }
});

familySchema.methods.createWishlist = function () {
  const wishlist = new Wishlist();

  wishlist.save(function(err) {
    if (err) console.log(err);
  });
};

familySchema.methods.readWishlist = function () {
  return Wishlist.findOne({ 'Family': this._id }, function (err, wishlist) {
    if (err) {
      console.log(err);
    } else {
      return wishlist;
    }
  });
};

// TODO: Delete wishlist, addItem, removeItem, updateItem

const Family = mongoose.model('Family', familySchema);

module.exports = Family;
