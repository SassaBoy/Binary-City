// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const linkedRoutes = require('./controllers/linkedController');
const clientRoutes = require('./controllers/clientController');
const contactRoutes = require('./controllers/contactController');
// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
 
});

// Basic route
app.get('/', (req, res) => {
  res.render('index');
});

// Include client routes

app.use('/clients', clientRoutes);
app.use('/linked', linkedRoutes); // Add this line

// Include contact routes
app.use('/contacts', contactRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
