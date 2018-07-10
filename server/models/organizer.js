const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const organizerSchema = new Schema({
  name: {
    type: Schema.Types.ObjectId,
    ref: 'Name',
    required: true,
  },
  organization: {
    type: String,
    required: true,
  },
});

const Organizer = mongoose.model('Organizer', organizerSchema);

module.exports = Organizer;
