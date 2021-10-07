const express = require('express');
const groupController = require('../controllers/group');
const {
  updateGroupValidation
} = require('../middlewares/validation.middleware');
const validationError = require('../helpers/validation-error.helper');
const { verifyToken } = require('../middlewares/passport.middleware');

const groupRouter = () => {
  const router = express.Router();

  router.get('/filter', verifyToken, groupController.getFilteredGroups);
  router.get('/all', verifyToken, groupController.getGroups);
  router.get('/:groupname', verifyToken, groupController.getGroup);
  router.put(
    '/update',
    [...updateGroupValidation, verifyToken, validationError],
    groupController.updateGroup
  );

  return router;
};
module.exports = groupRouter;
