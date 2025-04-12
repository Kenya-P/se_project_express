const router = require('express').Router();
const { createItem } = require('../controllers/clothingItems');


router.post('/clothingItems', createItem);

module.exports = router;