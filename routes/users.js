const router = require('express').Router();
const { createUser, getCurrentUser, updateProfile } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signup', createUser);  // Add this line to handle POST /signup

router.get('/me', auth, getCurrentUser);
router.patch('/me', auth, updateProfile);

module.exports = router;
