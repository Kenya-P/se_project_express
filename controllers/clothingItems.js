const {CREATED, OK} = require('../utils/statusCodes.js');
const clothingItem = require('../models/clothingItem');
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');


const createItem = (req, res, next) => {
  console.log(req.body);

  const { name, weather, imageUrl } = req.body;

  clothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(CREATED).send(item))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(err.message));
      }
      return next(err);
    });
}

const getItems = (req, res, next) => {
  clothingItem.find({})
    .then((items) => res.status(OK).send(items))
    .catch((err) => next(err));
};





const deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  clothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        throw new ForbiddenError('You do not have permission to delete this item');
      }
      return clothingItem.findByIdAndDelete(itemId);
    })
    .then((deletedItem) => res.status(OK).send(deletedItem))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Invalid item ID'));
      }
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('Item not found'));
      }
      return next(err);
    });
};


const likeItem = (req, res, next) => {
  const { itemId } = req.params;

  clothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((item) => res.status(OK).send(item))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError(err.message));
      }
      if (err.name === 'CastError') {
        return next(new BadRequestError(err.message));
      }
      return next(err);
    });
};

const dislikeItem = (req, res, next) => {
  const { itemId } = req.params;

  clothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((item) => res.status(OK).send(item))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError(err.message));
      }
      if (err.name === 'CastError') {
        return next(new BadRequestError(err.message));
      }
      return next(err);
    });
};

module.exports = { createItem, getItems, deleteItem, likeItem, dislikeItem };
