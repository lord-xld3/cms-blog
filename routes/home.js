const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// GET / - Homepage route
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: User, attributes: ['username'] }],
      order: [['createdAt', 'DESC']],
    });

    // Check if the user is authenticated
    const isAuthenticated = req.session.userId ? true : false;

    res.render('home', { posts, isAuthenticated });
  } catch (error) {
    console.error(error);
    res.render('error'); // Render the error page
  }
});

module.exports = router;