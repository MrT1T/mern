const express = require('express');
const groupController = require('../controllers/group');

const groupRouter = () => {
  const router = express.Router();

  router.get('/all', groupController.getGroups);
  router.get('/:groupname', groupController.getGroup);
  router.put('/update', groupController.updateGroup);

  return router;
};
module.exports = groupRouter;
