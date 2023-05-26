const Sequelize = require('sequelize');

let sequelize;

if (process.env.JAWSDB_URL) {
  // Database connection from Heroku's environment variable
  sequelize = new Sequelize(process.env.JAWSDB_URL, {
    dialect: 'mysql',
    protocol: 'mysql',
    logging: true // Set to true to see database queries in the console
  });
} else {
  // Local database connection
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
  });
}

module.exports = sequelize;
