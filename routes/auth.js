const router = require('express').Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ where: { username } });

    if (!user) {
      // User not found
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Compare the provided password with the hashed password stored in the database
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      // Passwords don't match
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Store the user ID in the session
    req.session.userId = user.id;

    // Send a response or redirect to a different route
    res.json({ message: 'Login successful' });
  } catch (err) {
    // Handle authentication errors
    res.status(500).json({ error: 'Internal server error' });
  }
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

    // Send a response or redirect to a different route
    res.json({ message: 'Registration successful' });
  } catch (err) {
    // Handle registration errors
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;