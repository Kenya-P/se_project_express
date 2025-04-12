const mongoose = require('mongoose');

const clothingItemSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  weather: {
    type: String,
    required: true,
    enum: ['sunny', 'rainy', 'snowy', 'windy'],
  },
  imageUrl: {
    type: String,
    required: [true, 'The imageUrl field is required'],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: 'You must enter a valid URL',
    }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  }]

});

module.exports = mongoose.model('user', clothingItemSchema);