// linkedController.js
const express = require('express');
const router = express.Router();
const Linked = require('../models/linked');

router.post('/clients/link/:contactId', async (req, res) => {
  const contactId = req.params.contactId;
  let clients = req.body.clients;

  try {
    // Find the linked document for the given contactId
    let linkedDocument = await Linked.findOne({ contact: contactId });

    // If no linked document exists, create a new one
    if (!linkedDocument) {
      linkedDocument = new Linked({ contact: contactId, clients: [] });
    }
// Ensure clients is an array and not empty
clients = Array.isArray(clients) && clients.length > 0 ? clients : [];
    // Rest of your code remains the same...
    
    // Add the clients to the linked document
    linkedDocument.clients = [...linkedDocument.clients, ...clients];
    
    // Save the linked document
    const savedLinkedDocument = await linkedDocument.save();

    res.json({ success: true, linkedDocument: savedLinkedDocument });
  } catch (error) {
    console.error('Error linking clients:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

module.exports = router;
