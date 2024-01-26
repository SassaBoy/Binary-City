// linked.js or wherever you define the Linked model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const linkedSchema = new Schema({
  contact: {
    type: Schema.Types.ObjectId,
    ref: 'Contact', // Reference to your Contact model
    required: true,
  },
  clients: [{
    type: Schema.Types.ObjectId,
    ref: 'Client', // Reference to your Client model (or whatever model clients represent)
    required: true,
  }],
});

const Linked = mongoose.model('Linked', linkedSchema);

module.exports = Linked;
