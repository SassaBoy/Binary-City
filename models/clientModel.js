// clientModel.js
const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  clientCode: {
    type: String,
    required: true,
    unique: true,
  },
  linkedContacts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Linked',
    },
  ],
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
