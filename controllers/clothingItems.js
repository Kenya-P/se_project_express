//const mongoose = require('mongoose');
const ClothingItem = require('../models/clothingItem');
const { BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = require('../utils/errors');

const createItem = (req, res) => {
  console.log(req.body);

  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: "An error has occured on the server" });
    });
}

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch((err) => {
      console.error(err);
      return res.status(NAL_SERVER_ERROR).send({ message: err.message });
    });
}


const deleteItem = (req, res) => {
  const {itemId} = req.params;

  ClothingItem.findByIdAndDelete(itemId)
  .orFail()
  .then((item) => res.send(item))
  .catch((err) => {
    console.error(err);
    if (err.name === 'CastError') {
      return res.status(BAD_REQUEST).send({ message: 'Invalid item ID' });
    }
    if (err.name === 'DocumentNotFoundError') {
      return res.status(NOT_FOUND).send({ message: 'Item not found' });
    }
    return res.status(INTERNAL_SERVER_ERROR).send({ message: "An error has occured on the server" });
  });
}

const likeItem = (req, res) => {
    const { itemId } = req.params;

    ClothingItem.findByIdAndUpdate(
      itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
      .then((item) => {
        if (!item) {
          return res.status(NOT_FOUND).send({ message: "Item not found" });
        }
        return res.send(item);
      })
      .catch((err) => {
        if (err.name === "CastError") {
          return res.status(BAD_REQUEST).send({ message: "Invalid ID format" });
        }
        return res.status(SERVER_ERROR).send({ message: "Error updating likes" });
      });
  };

  const dislikeItem = (req, res) => {
    const { itemId } = req.params;

    ClothingItem.findByIdAndUpdate(
      itemId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
      .then((item) => {
        if (!item) {
          return res.status(NOT_FOUND).send({ message: "Item not found" });
        }
        return res.send(item);
      })
      .catch((err) => {
        if (err.name === "CastError") {
          return res.status(BAD_REQUEST).send({ message: "Invalid ID format" });
        }
        return res.status(SERVER_ERROR).send({ message: "Error updating likes" });
      });

  }

module.exports = { createItem, getItems, deleteItem, likeItem, dislikeItem };
