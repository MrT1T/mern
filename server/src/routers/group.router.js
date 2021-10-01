const express = require('express');
const groupController = require('../controllers/group');
const {
  updateGroupValidation
} = require('../middleware/validation.middleware');
const validationError = require('../helpers/validationError.helper');

const groupRouter = () => {
  const router = express.Router();

  router.get('/filter', groupController.getFilteredGroups);
  router.get('/all', groupController.getGroups);
  router.get('/:groupname', groupController.getGroup);
  router.put(
    '/update',
    [...updateGroupValidation, validationError],
    groupController.updateGroup
  );

  return router;
};
module.exports = groupRouter;
