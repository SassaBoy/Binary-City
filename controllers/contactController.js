const express = require('express');
const router = express.Router();
const Contact = require('../models/contactModel');
const Client = require('../models/clientModel');
const Linked = require('../models/LinkedModel');
const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;

// Contact creation route (GET)
router.get('/contactView', async(req, res)=>{
  try {
    const contact = await Contact.find().sort({ surname: 'asc' });
    const client = await Client.find().sort({ name: 'asc' });

    // Replace the following line with your logic to get linkedContacts
    const linkedContacts = await getLinkedContacts(); // Adjust this line based on your logic

    res.render('contactForm', { contact, client, linkedContacts });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/contactForm', async(req, res)=>{
  try {
    const contact = await Contact.find().sort({ surname: 'asc' });
    const client = await Client.find().sort({ name: 'asc' });

    // Replace the following line with your logic to get linkedContacts
    const linkedContacts = await getLinkedContacts(); // Adjust this line based on your logic

    res.render('contactForm', { contact, client, linkedContacts });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/new', async (req, res) => {
  try {
    const contact = await Contact.find().sort({ surname: 'asc' });
    const client = await Client.find().sort({ name: 'asc' });

    // Replace the following line with your logic to get linkedContacts
    const linkedContacts = await getLinkedContacts(); // Adjust this line based on your logic

    res.render('contactForm', { contact, client, linkedContacts });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Function to get linkedContacts (replace this with your actual logic)
async function getLinkedContacts() {
  try {
    // Example logic - replace this with your actual implementation
    const linkedContacts = await Linked.find().sort({ /* your sorting criteria */ }).sort({ surname: 'asc' });
    return linkedContacts;
  } catch (error) {
    console.error('Error fetching linked contacts:', error);
    throw error; // You may want to handle the error appropriately in your application
  }
}

// Example server-side code
router.post('/contacts/link/:contactId', async (req, res) => {
  try {
    const contactId = req.params.contactId;
    
    // Parse contactId to ObjectId
    const contactObjectId = ObjectId(contactId);

    let selectedClients = req.body.clients;

    // Ensure selectedClients is an array
    if (!Array.isArray(selectedClients)) {
      selectedClients = [selectedClients];
    }

    // Implement your logic to save the linked information in the Linked model
    // Example: Create a new Linked document for each selected client and link it to the contact
    for (const clientId of selectedClients) {
      const linkedDocument = new Linked({
        contactId: contactObjectId,
        clientId: clientId
      });
      await linkedDocument.save();
    }

    // Send a success response to the client
    res.json({ success: true });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'An error occurred. Please try again.' });
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
    const clients = await Client.find().sort({ name: 'asc' });
    const contacts = await Contact.find().sort({ surname: 'asc' });

    // Fetch linked contacts
    const linkedContacts = await Linked.find().populate('contactId');

    // Separate linked and available contacts
    const linkedContactIds = linkedContacts.map(linkedContact => linkedContact.contactId._id.toString());
    const availableContacts = contacts.filter(contact => !linkedContactIds.includes(contact._id.toString()));

    res.render('contactView', { clients, linkedContacts, availableContacts, contacts });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


// Other routes for contact actions
// Fetch available clients for a contact
router.get('/availableClients', async (req, res) => {
  try {
    const availableClients = await Client.find().sort({ name: 'asc' });
    res.json(availableClients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
