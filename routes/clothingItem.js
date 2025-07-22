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


module.exports = router;
