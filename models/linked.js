// linkedModel.js
const mongoose = require('mongoose');

const linkedSchema = new mongoose.Schema({
  contactId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact',
    required: true,
  },
  contactDetails: {
    // Add fields as needed to store contact details
    type: Object,
    required: true,
  },
  client: {
    // Assuming that client contains details like _id, name, etc.
    type: Object,
    required: true,
  },
});

const Linked = mongoose.model('LinkedModel', linkedSchema);

module.exports = Linked;
