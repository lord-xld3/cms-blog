const router = require('express').Router();
const { Post, User } = require('../models');

// Authentication middleware
const authenticate = (req, res, next) => {
  if (req.session.userId) {
    // User is authenticated, proceed to the next middleware or route handler
    next();
  } else {
    // User is not authenticated, redirect to the login page or any other desired route
    res.redirect('/login');
  }
};

// Apply the authentication middleware to the entire dashboard router
router.use(authenticate);

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: User, attributes: ['username'] }],
    });

    // Make the user object an "own property" by formatting the data
    const formattedPosts = posts.map(post => {
      return {
        ...post.get(), // Spread the post's properties
        user: { ...post.user.get() }, // Spread the user's properties
      };
    });

    res.render('dashboard', { posts: formattedPosts });
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
