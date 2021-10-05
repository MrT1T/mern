const { validationResult } = require('express-validator');
const createError = require('http-errors');

const validationError = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw createError(422, 'Validation Error', { errors: errors.array() });
  }

  next();
};

module.exports = validationError;
