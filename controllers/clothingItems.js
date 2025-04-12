const { model } = require('mongoose');
const ClothingItem = require('../models/clothingItem');
const { BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = require('../utils/errors');

const createItem = (req, res) => {
  console.log(req.body);

  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
}

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      return res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
}

const updateItem = (req, res) => {
  const {itemId} = req.params;
  const {imageUrl} = req.body;

  ClothingItem.findByIdAndUpdate(itemId, {$set: {imageUrl}})
  .orFail()
  .then((item) => res.status(200).send(item))
  .catch((err) => {
    console.error(err);
    if (err.name === 'CastError') {
      return res.status(BAD_REQUEST).send({ message: 'Invalid item ID' });
    }
    if (err.name === 'DocumentNotFoundError') {
      return res.status(NOT_FOUND).send({ message: 'Item not found' });
    }
    return res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
  });

}

const deleteItem = (req, res) => {
  const {itemId} = req.params;

  ClothingItem.findByIdAndDelete(itemId)
  .orFail()
  .then((item) => res.status(200).send(item))
  .catch((err) => {
    console.error(err);
    if (err.name === 'CastError') {
      return res.status(BAD_REQUEST).send({ message: 'Invalid item ID' });
    }
    if (err.name === 'DocumentNotFoundError') {
      return res.status(NOT_FOUND).send({ message: 'Item not found' });
    }
    return res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
  });

}

module.exports = { createItem, getItems, updateItem, deleteItem };
