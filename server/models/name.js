const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nameSchema = new Schema({
  // Name model exists to search users by name
  // Possible to separate other contact info out in similar way as Name
  first: {
    type: String,
    required: true,
  },
  middle: String,
  last: {
    type: String,
    required: true,
  },
});

const Name = mongoose.model('Name', nameSchema);

module.exports = Name;
