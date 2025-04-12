const { model } = require('mongoose');
const ClothingItem = require('../models/clothingItem');

const createItem = (req, res) => {
  console.log(req.body);

  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
}

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: err.message });
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
      return res.status(400).send({ message: 'Invalid item ID' });
    }
    if (err.name === 'DocumentNotFoundError') {
      return res.status(404).send({ message: 'Item not found' });
    }
    return res.status(500).send({ message: err.message });
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
      return res.status(400).send({ message: 'Invalid item ID' });
    }
    if (err.name === 'DocumentNotFoundError') {
      return res.status(404).send({ message: 'Item not found' });
    }
    return res.status(500).send({ message: err.message });
  });

}

module.exports = { createItem, getItems, updateItem, deleteItem };
