const router = require('express').Router();
const { createUser, getCurrentUser, updateProfile, logIn} = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signup', createUser);  // Add this line to handle POST /signup
router.post('/signin', logIn); // Add this line to handle POST /signin

router.get('/me', auth, getCurrentUser);
router.patch('/me', auth, updateProfile);

module.exports = router;
