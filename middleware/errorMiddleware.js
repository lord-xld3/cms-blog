// errorMiddleware.js

const errorMiddleware = (err, req, res, next) => {
    console.error(err); // Log the error for debugging purposes
    res.status(500).render('error.hbs', { error: err });
};
  
module.exports = errorMiddleware;
  