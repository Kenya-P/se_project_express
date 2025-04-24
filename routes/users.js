const router = require('express').Router();
const { getUsers, getCurrentUser, updateProfile } = require('../controllers/users');
const { route } = require('./clothingItem');


router.get('/users', getUsers);
router.get('/users/:userId', getCurrentUser);
router.patch('/users/me', updateProfile);

module.exports = router;