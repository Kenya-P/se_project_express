const router = require('express').Router();
const clothingItem = require('./clothingItem');

const userRouter = require('./users');

router.use('/users', userRouter);
router.use('/items', clothingItem);

module.exports = router;