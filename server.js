const express = require('express');
const hbs = require('hbs');
const { engine } = require('express-handlebars');
const session = require('express-session');
const path = require('path');
const notFoundMiddleware = require('./middleware/notFoundMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');

// Import routes
const homeRoutes = require('./routes/home');
const dashboardRoutes = require('./routes/dashboard');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3001;

// Configure hbs (Handlebars) as the view engine
app.engine('hbs', engine({ extname: 'hbs', defaultLayout: 'main' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Configure hbs partials
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Configure session middleware
app.use(
  session({
    secret: 'your-secret-key', // Replace with your own secret key
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set to true if using HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // Session duration in milliseconds (e.g., 24 hours)
    },
  })
);

// Middleware to parse JSON data
app.use(express.json());

// Middleware to parse url-encoded data
app.use(express.urlencoded({ extended: true }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.use('/', homeRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/', authRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
