import { ERROR_MESSAGES } from '../constant/errors.const';
import { validEmailReg } from '../constant/variable.const';

const validateMaxLength = (data, errors) => {
  Object.keys(data).forEach((item) => {
    if (data[item].length > 30) {
      errors[item] = ERROR_MESSAGES.MAX_LENGTH;
    }
  });
  return errors;
};

export function validateData(data, validator) {
  let errors = validator(data);
  errors = validateMaxLength(data, errors);

  const isValid = !Object.values(errors).length;
  return {
    errors,
    isValid
  };
}

export function validateUserEdit({ username, firstName, lastName, email }) {
  const errors = {};
  if (!username) {
    errors.username = ERROR_MESSAGES.USERNAME_REQUIRED;
  }

  if (!firstName) {
    errors.firstName = ERROR_MESSAGES.FIRSTNAME_REQUIRED;
  }

  if (!lastName) {
    errors.lastName = ERROR_MESSAGES.LASTNAME_REQUIRED;
  }
  if (!email) {
    errors.email = ERROR_MESSAGES.EMAIL_REQUIRED;
  }
  if (email) {
    const isEmail = validEmailReg.test(email);
    if (!isEmail) {
      errors.email = ERROR_MESSAGES.EMAIL_NOT_VALID;
    }
  }

  return errors;
}

export function validateGroupEdit({ name, title }) {
  const errors = {};
  if (!name) {
    errors.name = ERROR_MESSAGES.NAME_REQUIRED;
  }

  if (!title) {
    errors.title = ERROR_MESSAGES.TITLE_REQUIRED;
  }

  return errors;
}
