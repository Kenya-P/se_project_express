const { Joi, celebrate } = require('celebrate');
const validator = require('validator');

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};


const validateCreateItem = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    weather: Joi.string().required().valid('hot', 'warm', 'cold'),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      'string.empty': 'The "imageUrl" field must be filled in',
      'string.uri': 'The "imageUrl" field must be a valid URL',
    }),
  }),
});

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().custom(validateURL),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hex().length(24).required(),
  }),
});

const validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      'string.min': 'The minimum length of the "name" field is 2',
      'string.max': 'The maximum length of the "name" field is 30',
      'string.empty': 'The "name" field must be filled in',
    }),
    weather: Joi.string().valid('hot', 'warm', 'cold').required()
      .messages({
        'any.only': 'The "weather" field must be one of: hot, warm, or cold',
        'string.empty': 'The "weather" field must be filled in',
      }),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      'string.empty': 'The "imageUrl" field must be filled in',
      'string.uri': 'The "imageUrl" field must be a valid url',
    }),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateURL),
  }),
});


module.exports = {
  validateURL,
  validateCreateItem,
  validateCreateUser,
  validateLogin,
  validateId,
  validateCardBody,
  validateUpdateUser,
};