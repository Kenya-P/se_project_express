const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');
const UnauthorizedError = require('../errors/unauthorizedError');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Authorization required'));
  }

  const token = authorization.replace('Bearer ', '');

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    next(new UnauthorizedError('Invalid or expired token'));
  }
};

// Optional authentication: doesn't throw, just skips if token is bad
const optionalAuth = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return next();

  try {
    req.user = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.warn('Invalid token, skipping authentication');
    return next();
  }

  return next();
};

module.exports = { auth, optionalAuth };
