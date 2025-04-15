const router = require('express').Router();
const clothingItem = require('./clothingItem');
const { BAD_REQUEST } = require('../utils/errors');
const userRouter = require('./users');

router.use('/users', userRouter);
router.use('/items', clothingItem);

router.use((req, res) => {
  res.status(BAD_REQUEST).send({ message: 'Requested resource not found' });
}
);

module.exports = router;