// linkedModel.js
const mongoose = require('mongoose');

const linkedSchema = new mongoose.Schema({
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact',
    required: true,
  },
  clients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  }],
});

const Linked = mongoose.model('LinkedModel', linkedSchema);

module.exports = Linked;