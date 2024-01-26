// linkedController.js
const express = require('express');
const router = express.Router();
const Linked = require('../models/linked');

// Add a new route to handle linking clients to a contact
router.post('/link/:contactId', async (req, res) => {
  try {
    const contactId = req.params.contactId;
    const selectedClients = req.body.clients;

    // Create a linked document
    const linkedDocument = new Linked({
      contact: contactId,
      clients: selectedClients,
    });

    // Insert the linked document into the database
    await linkedDocument.save();

    // Send a success response
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred. Please try again.' });
  }
});

module.exports = router;
