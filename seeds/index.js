const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Create users
  const users = await User.bulkCreate([
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
    { username: 'user3', password: 'password3' },
  ]);

  // Create posts
  const posts = await Post.bulkCreate([
    { title: 'Post 1', content: 'This is the content of post 1', userId: users[0].id },
    { title: 'Post 2', content: 'This is the content of post 2', userId: users[1].id },
    { title: 'Post 3', content: 'This is the content of post 3', userId: users[2].id },
  ]);

  // Create comments
  await Comment.bulkCreate([
    { content: 'Comment 1', userId: users[0].id, postId: posts[0].id },
    { content: 'Comment 2', userId: users[1].id, postId: posts[0].id },
    { content: 'Comment 3', userId: users[2].id, postId: posts[1].id },
  ]);

  console.log('Database seeded successfully!');
};

seedDatabase();
