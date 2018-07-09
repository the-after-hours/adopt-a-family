const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wishlistSchema = new Schema(
  {
    family: {
      type: Schema.ObjectId,
      ref: 'Family',
    },
    list: [
      // An array of objects
      {
        itemName: { type: String, required: true },
        itemQuantity: { type: Number, required: true },
        itemCost: Number,
        dateLastUpdated: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    totalListCost: Number,
  },
  { usePushEach: true }
);

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;
