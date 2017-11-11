const mongoose = require('mongoose');
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
    required: true,
  },
  size: Number,
});

const Family = mongoose.model('Family', familySchema);

module.exports = Family;
