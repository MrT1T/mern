const { check } = require('express-validator');

const updateUserValidation = [
  check('email').isEmail().isLength({ max: 30 }),
  check('id').isLength({ min: 1, max: 30 }),
  check('username').isLength({ min: 1, max: 30 }),
  check('firstName').isLength({ min: 1, max: 30 }),
  check('lastName').isLength({ min: 1, max: 30 })
];

const updateProjectValidation = [
  check('name').isLength({ min: 1, max: 30 }),
  check('title').isLength({ min: 1, max: 30 })
];

module.exports = {
  updateUserValidation,
  updateProjectValidation
};
