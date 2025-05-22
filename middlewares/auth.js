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

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(UNAUTHORIZED).send({ message: 'Invalid/expired token' });
  }

  // Log 'payload' after it's defined
  console.log("Decoded user:", payload);

  req.user = payload;

  return next();
};

module.exports = auth;
