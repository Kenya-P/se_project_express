const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');
const { UNAUTHORIZED } = require('../utils/errors');

const auth = (req, res, next) => {
  // Define 'authorization' first
  const { authorization } = req.headers;

  // Log the 'authorization' after it's defined
  console.log("Auth header:", authorization);

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(UNAUTHORIZED).send({ message: 'Authorization required' });
  }

  const token = authorization.replace('Bearer ', '');


  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    return res.status(UNAUTHORIZED).send({ message: 'Invalid/expired token' });
  }
};

// Optional authentication middleware
const optionalAuth = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return next();

  try {
    req.user = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.warn('optionalAuth: invalid token ignored');
    // Don't set req.user, just continue as guest
  }
  next();
};

module.exports = { auth, optionalAuth };