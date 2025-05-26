const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  avatar: {
    type: String,
    required: [true, 'The avatar field is required'],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: 'You must enter a valid URL',
    }
  },
  email: {
    type: String,
    required: [true, 'The email field is required'],
    unique: true,
    select: false,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: 'You must enter a valid email address',
    }
  },
  password: {
    type: String,
    required: [true, 'The password field is required'],
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        console.log("❌ No user found with email:", email);
        return Promise.reject(new Error('Incorrect email or password'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
          console.log("Typed password:", password);
          console.log("Stored hash:", user.password);
          console.log("Result:", matched);
          return Promise.reject(new Error('Incorrect email or password'));
          }
          console.log("✅ User authenticated successfully:", user._email);
          return user;
        });
    });
};

userSchema.pre('save', async function hashPassword(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('user', userSchema);