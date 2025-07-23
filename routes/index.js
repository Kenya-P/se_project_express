const router = require('express').Router();
const clothingItem = require('./clothingItem');
const userRoutes = require('./users');
const NotFoundError = require('../errors/notFoundError');

// These handle /signup, /signin, /me, etc.
router.use(userRoutes);

// This handles /items
router.use('/items', clothingItem);

// Catch-all 404 — must go last
router.use('*', (req, res, next) => {
  next(new NotFoundError('Requested resource not found'));
});

module.exports = router;
