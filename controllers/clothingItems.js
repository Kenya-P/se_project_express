const { NOT_FOUND, BAD_REQUEST, INTERNAL_SERVER_ERROR, FORBIDDEN, CREATED, OK} = require('../utils/errors');
const clothingItem = require('../models/clothingItem');


const createItem = (req, res) => {
  console.log(req.body);

  const { name, weather, imageUrl } = req.body;

  clothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(CREATED).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: "An error has occured on the server" });
    });
}

/*const getItems = (req, res) => {
  clothingItem.find({})
    .then((items) => res.status(OK).send(items))
    .catch((err) => {
      console.error(err);
      return res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
}*/

const getItems = (req, res) => {
  const userId = req.user?._id;

  const query = userId
    ? { $or: [{ owner: userId }, { isPublic: true }] }
    : { isPublic: true };

  clothingItem.find(query)
    .then((items) => res.status(OK).send(items))
    .catch((err) => {
      console.error(err);
      res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
};



const deleteItem = (req, res) => {
  const {itemId} = req.params;

  clothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        return Promise.reject(new Error('You do not have permission to delete this item'));
        }
      return clothingItem.findByIdAndDelete(itemId);
    })
    .then((item) => res.status(OK).send(item))
    .catch((err) => {
      console.error(err);
      if (err.message === 'You do not have permission to delete this item') {
        return res.status(FORBIDDEN).send({ message: err.message });
      }
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST).send({ message: 'Invalid item ID' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(NOT_FOUND).send({ message: 'Item not found' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: "An error has occurred on the server" });
    });
}

const likeItem = (req, res) => {
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
        return res.status(NOT_FOUND).send({ message: 'Item not found' });
      }
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST).send({ message: 'Invalid item ID' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'An error has occurred on the server.' });
    });
};

const dislikeItem = (req, res) => {
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
        return res.status(NOT_FOUND).send({ message: 'Item not found' });
      }
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST).send({ message: 'Invalid item ID' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'An error has occurred on the server.' });
    });
};

const getItemById = (req, res) => {
  const { itemId } = req.params;

  clothingItem.findById(itemId)
    .orFail()
    .then((item) => res.status(OK).send(item))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(NOT_FOUND).send({ message: 'Item not found' });
      }
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST).send({ message: 'Invalid item ID' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'An error has occurred on the server.' });
    });
}

module.exports = { createItem, getItems, deleteItem, likeItem, dislikeItem, getItemById };
