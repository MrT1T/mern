const createErrorMessage = (code) => {
  switch (code) {
    case 401:
      return 'Invalid username or password.';
    case 404:
      return 'PAGE NOT FOUND';
    case 405:
      return 'User not found';
    case 406:
      return 'Project not found';
    case 500:
      return 'Internal Server Error ';

    default:
      return 'Bad Request';
  }
};
module.exports = createErrorMessage;
