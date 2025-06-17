const router = require('express').Router();
const { createItem, getItems, deleteItem, likeItem, dislikeItem, getItemById } = require('../controllers/clothingItems');
const { auth, optionalAuth } = require('../middlewares/auth');

// Allow public access to GET items (with optionalAuth)
router.get('/', optionalAuth, getItems);

// Authenticated routes
router.post('/', auth, createItem);
router.delete('/:itemId', auth, deleteItem);
router.put('/:itemId/likes', auth, likeItem);
router.delete('/:itemId/likes', auth, dislikeItem);

// router.get('/:itemId', getItemById);

module.exports = router;
