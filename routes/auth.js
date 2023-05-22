const router = require('express').Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');

// Render the login form
router.get('/login', (req, res) => {
  res.render('login');
});

// Handle the login form submission
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log('Username:', username);
    console.log('Password:', password);

    // Find the user by username
    const user = await User.findOne({ where: { username } });

    console.log('User:', user);

    if (!user) {
      // User not found
      console.log('User not found');
      return res.render('login', { error: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password stored in the database
    const match = await bcrypt.compare(password, user.password);

    console.log('Passwords match:', match);

    if (!match) {
      // Passwords don't match
      console.log('Passwords don\'t match');
      return res.render('login', { error: 'Invalid credentials' });
    }

    // Store the user ID in the session
    req.session.userId = user.id;

    console.log('User ID:', req.session.userId);

    // Redirect to the dashboard or any other desired route
    return res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.render('error');
  }
});

// Render the registration form
router.get('/register', (req, res) => {
  res.render('register');
});

// Handle the registration form submission
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database with the hashed password
    const user = await User.create({ username, password: hashedPassword });

    // Store the user ID in the session
    req.session.userId = user.id;

    // Redirect to the dashboard or any other desired route
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.render('error');
  }
});

module.exports = router;
