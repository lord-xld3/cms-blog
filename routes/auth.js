const router = require('express').Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ where: { username } });

    if (!user) {
      // User not found
      return res.render('login', { error: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password stored in the database
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      // Passwords don't match
      return res.render('login', { error: 'Invalid credentials' });
    }

    // Store the user ID in the session
    req.session.userId = user.id;

    // Redirect to the dashboard or any other desired route
    return res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.render('error');
  }
});

router.get('/register', (req, res) => {
  res.render('register');
});

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
