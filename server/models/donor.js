const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const donorSchema = new Schema({
  name: {
    type: Schema.Types.ObjectId,
    ref: 'Name',
  },
  budget: {
    type: Number,
    required: true,
  },
  matchedFamily: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
  },
});

const Donor = mongoose.model('Donor', donorSchema);

module.exports = Donor;
