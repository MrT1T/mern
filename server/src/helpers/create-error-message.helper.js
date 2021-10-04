const createErrorMessage = (code) => {
  switch (code) {
    case 404:
      return 'PAGE NOT FOUND';
    case 405:
      return 'User not found';
    case 406:
      return 'Group not found';
    case 500:
      return 'Internal Server Error ';

    default:
      return 'Bad Request';
  }
};
module.exports = createErrorMessage;