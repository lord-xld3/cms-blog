const router = require('express').Router();

// Define your dashboard routes
router.get('/', (req, res) => {
  // Handle the logic for the dashboard route
  res.send('Welcome to the dashboard!');
});

// Export the router
module.exports = router;
