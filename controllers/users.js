const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { JWT_SECRET } = require('../utils/config');
const { OK } = require('../utils/statusCodes.js');
const ConflictError = require('../errors/conflictError');
const BadRequestError = require('../errors/badRequestError');
const InternalServerError = require('../errors/internalServerError');
const NotFoundError = require('../errors/notFoundError');


const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  bcrypt.hash(password.trim(), 10)
    .then((hashedPassword) =>
      User.create({ name, avatar, email, password: hashedPassword })
    )
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.status(201).send({ token });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(err.message));
      }
      if (err.code === 11000) {
        return next(new ConflictError('User with this email already exists'));
      }
      return next(new InternalServerError('Something went wrong during registration'));
    });
};

const getCurrentUser = (req, res) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(OK).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('User not found'));
      }
      if (err.name === 'CastError') {
        return next(new BadRequestError(err.message));
      }
      return next(new InternalServerError('Something went wrong during registration'));
    });
};

const logIn = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
        return next(new BadRequestError(err.message));
  }

  return User.findUserByCredentials(email, password.trim())
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(OK).send({ token });
    })
    .catch((err) => {
      if (err.message === "Incorrect email or password") {
        return next(new BadRequestError(err.message));
      }
      return next(new InternalServerError('Something went wrong during registration'));
    });
};

const updateProfile = (req, res, next) => {
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.status(OK).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('User not found'));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(err.message));
      }
      if (err.name === 'CastError') {
        return next(new BadRequestError(err.message));
      }
      return next(new InternalServerError('Something went wrong during registration'));
    });
};

module.exports = { createUser, getCurrentUser, logIn, updateProfile };