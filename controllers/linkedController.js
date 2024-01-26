const express = require('express');
const router = express.Router();
const Linked = require('../models/linked');
const Contact = require('../models/contactModel'); // Import the Contact model

router.post('/clients/link/:contactId', async (req, res) => {
  const contactId = req.params.contactId;
  const { client } = req.body;

  try {
    // Validate client data
    if (!client || !client._id) {
      return res.status(400).json({ success: false, error: 'Invalid client data.' });
    }

    // Fetch contact details using the provided contact ID
    const contactDetails = await Contact.findById(contactId);

    // Construct the linked document with contact and client details
    const linkedDocument = new Linked({
      contactId,
      contact: contactDetails, // Use the contactDetails obtained from the Contact model
      clients: client, // Store a single client
    });

    // Save the linked document
    const savedLinkedDocument = await linkedDocument.save();

    res.json({ success: true, linkedDocument: savedLinkedDocument });
  } catch (error) {
    console.error('Error linking client:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

module.exports = router;
