const router = require('express').Router();
const { Post, User } = require('../models');

// Authentication middleware
const authenticate = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
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

    const formattedPosts = posts.map(post => ({
      ...post.get(),
      user: { ...post.user.get() },
    }));

    res.render('dashboard', { posts: formattedPosts });
  } catch (error) {
    console.error(error);
    res.render('error', { error: { message: 'Failed to load posts' } });
  }
});

// Create a new post (render the form)
router.get('/posts/new', (req, res) => {
  res.render('newPost');
});

// Create a new post (handle the form submission)
router.post('/posts/new', async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.session.userId;
    
    const post = await Post.create({ title, content, userId });

    res.redirect(`/dashboard/posts/${post.id}`);
  } catch (error) {
    console.error(error);
    res.render('error', { error: { message: 'Failed to create new post' } });
  }
});

// Get a specific post by ID
router.get('/posts/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByPk(postId, {
      include: [{ model: User, attributes: ['username'] }],
    });

    if (!post) {
      res.render('notFound');
      return;
    }

    const formattedPost = {
      ...post.get(),
      user: { ...post.user.get() },
    };

    res.render('singlePost', { post: formattedPost });
  } catch (error) {
    console.error(error);
    res.render('error', { error: { message: 'Post not found' } });
  }
});

// Delete a post
router.post('/posts/delete/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByPk(postId);

    // Check if the post exists
    if (!post) {
      res.render('error', { error: { message: 'Post not found' } });
      return;
    }

    // Check if the current user is the author of the post
    if (req.session.userId !== post.userId) {
      res.render('error', { error: { message: 'You are not authorized to delete this post' } });
      return;
    }

    // Delete the post
    await post.destroy();
    res.redirect('/dashboard'); // Redirect to the dashboard
  } catch (error) {
    console.error(error);
    res.render('error', { error: { message: 'Failed to delete post' } });
  }
});



// Update a post (render the edit post form)
router.get('/posts/edit/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByPk(postId);

    if (!post) {
      res.render('notFound');
      return;
    }

    if (req.session.userId !== post.userId) {
      res.render('error', { error: { message: 'You are not authorized to edit this post' } });
      return;
    }

    res.render('editPost', { post });
  } catch (error) {
    console.error(error);
    res.render('error', { error: { message: 'Failed to load edit post form' } });
  }
});

// Update a post (handle the form submission)
router.post('/posts/edit/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, content } = req.body;

    const post = await Post.findByPk(postId);

    if (!post) {
      res.render('notFound');
      return;
    }

    post.title = title;
    post.content = content;
    await post.save();

    res.redirect(`/dashboard/posts/${postId}`);
  } catch (error) {
    console.error(error);
    res.render('error', { error: { message: 'Failed to update post' } });
  }
});

module.exports = router;
