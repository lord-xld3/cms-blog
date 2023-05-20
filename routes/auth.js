const express = require('express');
const router = express.Router();
const { User } = require('../models');

// Route for user login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user with the provided username
    const user = await User.findOne({ where: { username } });

    // Check if the user exists and the password is correct
    if (!user || !user.validPassword(password)) {
      res.status(401).json({ message: 'Invalid username or password' });
      return;
    }

    // Store the user ID in the session
    req.session.userId = user.id;
    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route for user logout
router.post('/logout', (req, res) => {
  // Destroy the session and remove the userId
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.status(200).json({ message: 'Logout successful' });
  });
});

module.exports = router;
