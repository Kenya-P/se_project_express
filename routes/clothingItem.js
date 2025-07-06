const router = require('express').Router();
const { createItem, getItems, deleteItem, likeItem, dislikeItem } = require('../controllers/clothingItems');
const { auth, optionalAuth } = require('../middlewares/auth');
const { validateCreateItem, validateId, validateCardBody } = require('../middlewares/validation');

// Allow public access to GET items (with optionalAuth)
router.get('/', optionalAuth, getItems);

// Authenticated routes
router.post('/', auth, validateCreateItem, validateCardBody, createItem);
router.delete('/:itemId', auth, validateId, deleteItem);
router.put('/:itemId/likes', auth, validateId, likeItem);
router.delete('/:itemId/likes', auth, validateId, dislikeItem);

// Error handling for item not found
router.get('/:itemId', (req, res, next) => {
  Item.findById(req.params.itemId)
    .orFail(() => new NotFoundError('Item not found'))
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Invalid ID format'));
      }
      return next(err);
    });
});

module.exports = router;
