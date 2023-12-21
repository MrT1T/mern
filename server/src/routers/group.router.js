const express = require('express');
const projectController = require('../controllers/group');
const {
  updateProjectValidation
} = require('../middlewares/validation.middleware');
const validationError = require('../helpers/validation-error.helper');
const { verifyToken } = require('../middlewares/passport.middleware');

const projectRouter = () => {
  const router = express.Router();

  router.get('/filter', verifyToken, projectController.getFilteredProjects);
  router.get('/all', verifyToken, projectController.getProjects);
  router.get('/:projectname', verifyToken, projectController.getProject);
  router.put(
    '/update',
    [...updateProjectValidation, verifyToken, validationError],
    projectController.updateProject
  );

  return router;
};
module.exports = projectRouter;
