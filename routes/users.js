const router = require('express').Router();
const { createUser, getCurrentUser, updateProfile, logIn} = require('../controllers/users');
const {auth} = require('../middlewares/auth');
const { validateCreateUser, validateLogin, validateUpdateUser } = require('../middlewares/validation');

router.post('/signup', validateCreateUser, createUser);  // Add this line to handle POST /signup
router.post('/signin', validateLogin, logIn); // Add this line to handle POST /signin

router.get('/me', auth, getCurrentUser);
router.patch('/me', auth, validateUpdateUser ,updateProfile);

module.exports = router;
