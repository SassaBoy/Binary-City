const express = require('express');
const router = express.Router();
const Client = require('../models/clientModel');
const Contact = require('../models/contactModel');

// Function to generate unique client code
const generateClientCode = async (name) => {
  const sanitizedAlpha = name.replace(/[^A-Z]/g, '').toUpperCase().padEnd(3, 'A').slice(0, 3);
  const clientsCount = await Client.countDocuments() + 1;
  const numericPart = clientsCount.toString().padStart(3, '0');

  return sanitizedAlpha + numericPart;
};

// Client creation route (GET)
//clients/new
router.get('/new', async (req, res) => {
  try {
    const client = await Client.find().sort({ name: 'asc' });
    const contact = await Contact.find().sort({ surname: 'asc' });
    res.render('clientForm', { client, contact });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Client creation route (POST)
router.post('/new', async (req, res) => {
  try {
    // Generate unique client code based on the client's name
    const clientCode = await generateClientCode(req.body.name);

    // Create a new client with the generated client code
    const newClient = await Client.create({
      ...req.body,
      clientCode: clientCode,
    });

    res.redirect('/clients'); // Redirect to clients view after creating a new client
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Client view route
router.get('/', async (req, res) => {
  try {
    const client = await Client.find().sort({ name: 'asc' });
    const contact = await Contact.find().sort({ surname: 'asc' });
    res.render('clientView', { client, contact});
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Contact creation route (POST)
router.post('/new', async (req, res) => {
  try {
    // Verify if the email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(req.body.email);

    if (!isValidEmail) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }

    // Verify if the email is already taken
    const existingContact = await Contact.findOne({ email: req.body.email });
    if (existingContact) {
      return res.status(400).json({ error: 'Email is already taken.' });
    }

    // Create a new contact if everything is valid
    const newContact = await Contact.create(req.body);
    res.status(200).json({ success: 'Contact created successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred. Please try again.' });
  }
});



// Assuming your route for unlinking a contact from a client is '/clients/:clientId/unlink/:contactId'
router.get('/:clientId/unlink/:contactId', async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const contactId = req.params.contactId;

    // Add logic to unlink the contact from the client (remove the contact from the client's contacts array)
    const client = await Client.findById(clientId);
    if (client) {
      client.contacts = client.contacts.filter((c) => c.toString() !== contactId);
      await client.save();
    }

    res.redirect(`/clients/${clientId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Other routes for client actions

module.exports = router;
