const errorService = {
  createErrorMessage: (code) => {
    switch (code) {
      case 404:
        return 'PAGE NOT FOUND';
      case 500:
        return 'Internal Server Error ';

      default:
        return 'Bad Request';
    }
  }
};
module.exports = errorService;
