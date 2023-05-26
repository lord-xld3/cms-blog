# CMS-Blog

This project is a blogging platform that allows users to create posts, comment on posts, and manage their posts through a dashboard. It includes user authentication and authorization features.

The project is built using Node.js, Express.js, and Sequelize as the ORM (Object-Relational Mapping) for connecting to the database. The database used is MySQL.


## Dependencies

The project uses the following dependencies:

- Express.js: A web application framework for Node.js.
- Sequelize: An ORM (Object-Relational Mapping) for interacting with the database.
- MySQL2: A MySQL client for Node.js.
- Express-Session: A middleware for handling user sessions.
- Handlebars: A templating engine for rendering views.
- Bcrypt: A library for hashing passwords.
- Dotenv: A module for loading environment variables from a .env file.

## Getting Started

To run the project on your local machine, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd <project-directory>`
3. Install the dependencies: `npm install`
4. Set up the database connection by configuring the `config/connection.js` file.
5. Set up environment variables by creating a `.env` file and providing the necessary values.
6. Run the database migrations and seed data: `npm run seed`
7. Start the server: `npm start`
8. Open your browser and visit `http://localhost:3001` to access the application.

## Functionality

The blogging platform includes the following functionality:

- User Registration and Login: Users can create an account and log in to access their dashboard.
- Create New Post: Authenticated users can create new posts by providing a title and content.
- View Posts: Users can view existing posts on the homepage.
- View Single Post: Users can view the details of a single post, including the author and comments.
- Edit Post: Authenticated users can edit their own posts by updating the title and content.
- Delete Post: Authenticated users can delete their own posts.
- Create Comment: Users can leave comments on posts.
- Logout: Users can log out of their account.

## Demo

[Website](https://cms-blog1.herokuapp.com/)
