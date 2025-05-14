const router = require('express').Router();
const { createItem, getItems, deleteItem, likeItem, dislikeItem } = require('../controllers/clothingItems');
const auth = require('../middlewares/auth');

// The following routes are for creating, getting, deleting clothing items
router.post('/', auth, createItem);
router.get('/', getItems);
router.delete('/:itemId', auth, deleteItem);


// The following routes are for liking and disliking items
router.put('/:itemId/likes', auth, likeItem);
router.delete('/:itemId/likes', auth, dislikeItem);

module.exports = router;