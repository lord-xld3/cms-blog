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

// GET /posts/new - Render the newPost form
router.get('/posts/new', (req, res) => {
  res.render('newPost');
});

// POST /posts/new - Handle the form submission to create a new post
router.post('/posts/new', async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.session.userId; // Get the userId from the session

    // Create the new post with the userId
    await Post.create({ title, content, userId });

    res.redirect('/dashboard'); // Redirect to the dashboard after creating the post
  } catch (error) {
    console.error(error);
    res.render('error'); // Render the error page
  }
});


// GET /posts/:id - Single blog post route
router.get('/posts/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByPk(postId, {
      include: [
        { model: User, attributes: ['username'] },
        { model: Comment, include: [{ model: User, attributes: ['username'] }] },
      ],
    });

    if (!post) {
      res.render('notFound');
      return;
    }

    res.render('post', { post });
  } catch (error) {
    console.error(error);
    res.render('error'); // Render the error page
  }
});

// GET /posts/edit/:id - Edit blog post form route
router.get('/posts/edit/:id', async (req, res) => {
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
    res.render('error'); // Render the error page
  }
});

// POST /posts/edit/:id - Handle blog post update
router.post('/posts/edit/:id', async (req, res) => {
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

    res.redirect(`/dashboard/${postId}`); // Redirect to the updated post in the dashboard
  } catch (error) {
    console.error(error);
    res.render('error'); // Render the error page
  }
});

module.exports = router;
