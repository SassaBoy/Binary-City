const express = require('express');
const router = express.Router();
const Contact = require('../models/contactModel');
const Client = require('../models/clientModel');

// Contact creation route (GET)
router.get('/new', async(req, res) => {
  try {
    const contact = await Contact.find().sort({ surname: 'asc' });
    const client = await Client.find().sort({ name: 'asc' });
    res.render('contactForm', { contact, client });
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
    
    // Redirect to the contact view after creating a new contact
    res.status(200).json({ success: 'Contact created successfully.' });
    res.render('contactView');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred. Please try again.' });
  }
});


router.get('/', async (req, res) => {
  try {
    const client = await Client.find().sort({ name: 'asc' });
    const contact = await Contact.find().sort({ surname: 'asc' });
    res.render('contactView', { client, contact });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
// Other routes for contact actions

module.exports = router;
