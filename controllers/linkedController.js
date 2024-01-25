// linkedController.js
const express = require('express');
const router = express.Router();
const Contact = require('../models/contactModel');
const Client = require('../models/clientModel');
const Linked = require('../models/LinkedModel');

// Link a contact to one or more clients
router.post('/link/:contactId', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.contactId);

    // Remove existing links for this contact
    await Linked.deleteMany({ contact: contact._id });

    // Link the contact to the selected clients
    const linkedClients = req.body.clients.map(clientId => ({
      contact: contact._id,
      client: clientId,
    }));

    const linked = await Linked.create(linkedClients);

    // Update the contact's linkedClients field
    contact.linkedClients = linked.map(link => link._id);
    await contact.save();

    res.status(200).json({ success: 'Contacts linked successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred. Please try again.' });
  }
});

module.exports = router;
