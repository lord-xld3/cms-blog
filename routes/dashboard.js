// dashboard.js
const router = require('express').Router();
const { Post } = require('../models');

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.render('dashboard', { posts });
  } catch (error) {
    console.error(error);
    res.render('error'); // Render the error page
  }
});

// Get a specific post by ID
router.get('/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByPk(postId);
    if (post) {
      res.render('singlePost', { post });
    } else {
      res.render('notFound');
    }
  } catch (error) {
    console.error(error);
    res.render('error'); // Render the error page
  }
});

// Delete a post
router.delete('/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    await Post.destroy({ where: { id: postId } });
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.render('error'); // Render the error page
  }
});

// Update a post (render the edit post form)
router.get('/edit/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByPk(postId);
    
    if (!post) {
      res.render('notFound');
      return;
    }

    res.render('editPost', { post });
  } catch (error) {
    console.error(error);
    res.render('error');
  }
});

// Update a post (handle the form submission)
router.post('/edit/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, content } = req.body;

    // Find the post by its ID
    const post = await Post.findByPk(postId);

    if (!post) {
      res.render('notFound');
      return;
    }

    // Update the post with the new title and content
    post.title = title;
    post.content = content;
    await post.save();

    res.redirect(`/dashboard/${postId}`);
  } catch (error) {
    console.error(error);
    res.render('error'); // Render the error page
  }
});



module.exports = router;
