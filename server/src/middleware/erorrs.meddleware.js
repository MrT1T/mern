const createErrorMessage = require('../helpers/createErrorMessage.helper');

const errorsHandler = (error, req, res, next) => {
  if (error.status) {
    res.status(error.status);
    res.json({
      status: error.status,
      message: createErrorMessage(error.status),
      stack: error.stack
    });
  }
  return next(error);
};

const noPageError = async (req, res) => {
  res.status(404);
  res.json({
    status: 404,
    message: createErrorMessage(404)
  });
};

module.exports = { errorsHandler, noPageError };
