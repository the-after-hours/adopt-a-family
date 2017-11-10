const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wishlistSchema = new Schema({
  family: {
    type: Schema.objectId,
    ref: 'Family',
  },
  list: [
    // An array of objects
    {
      itemName: String,
      itemQuantity: Number,
      itemCost: Number,
      totalListCost: Number,
      dateLastUpdated: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;
