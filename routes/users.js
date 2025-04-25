const router = require('express').Router();
const { getUsers, getCurrentUser, updateProfile } = require('../controllers/users');
// const { route } = require('./clothingItem');
const auth = require('../middlewares/auth');

router.get('/users', getUsers);
router.get('/users/:userId', auth, getCurrentUser);
router.patch('/users/me', auth, updateProfile);

module.exports = router;