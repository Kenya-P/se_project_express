const router = require('express').Router();
const { createItem, getItems, deleteItem, likeItem, dislikeItem } = require('../controllers/clothingItems');


// The following routes are for creating, getting, and deleting clothing items
router.post('/', createItem);
router.get('/', getItems);
router.delete('/:itemId', deleteItem);


// The following routes are for liking and disliking items
router.put('/:itemId/likes', likeItem);
router.delete('/:itemId/likes', dislikeItem);

module.exports = router;