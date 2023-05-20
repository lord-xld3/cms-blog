// home.js
const router = require('express').Router();
const { Post } = require('../models');

router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.render('home', { posts });
  } catch (error) {
    console.error(error);
    res.render('error'); // Render the error page
  }
});

module.exports = router;
