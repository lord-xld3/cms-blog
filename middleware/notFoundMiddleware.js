// notFoundMiddleware.js
const notFoundMiddleware = (req, res, next) => {
  res.status(404).render('notFound.hbs');
};

module.exports = notFoundMiddleware;
