import { ERROR_MESSAGES } from '../constant/errors.const';
import { validEmailReg } from '../constant/variable.const';

const validateMaxLength = (
  data: Record<string, string>,
  errors: Record<string, string>
): Record<string, string> => {
  Object.keys(data).forEach((item) => {
    if (data[item].length > 30) {
      errors[item] = ERROR_MESSAGES.MAX_LENGTH;
    }
  });
  return errors;
};

export function validateData<T>(
  data: Record<keyof T, string>,
  validator: (obj: Record<string, string>) => Record<string, string>
): { errors: Record<string, string>; isValid: boolean } {
  let errors = validator(data);
  errors = validateMaxLength(data, errors);

  const isValid = !Object.values(errors).length;
  return {
    errors,
    isValid
  };
}

const emailValidate = (
  errors: Record<string, string>,
  email: string
): Record<string, string> => {
  if (email) {
    const isEmail = validEmailReg.test(email);
    if (!isEmail) {
      errors.email = ERROR_MESSAGES.EMAIL_NOT_VALID;
    }
  } else {
    errors.email = ERROR_MESSAGES.EMAIL_REQUIRED;
  }
  return errors;
};

export function validateUserEdit({
  username,
  firstName,
  lastName,
  email
}: Record<string, string>): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!username) {
    errors.username = ERROR_MESSAGES.USERNAME_REQUIRED;
  }

  if (!firstName) {
    errors.firstName = ERROR_MESSAGES.FIRSTNAME_REQUIRED;
  }

  if (!lastName) {
    errors.lastName = ERROR_MESSAGES.LASTNAME_REQUIRED;
  }

  return emailValidate(errors, email);
}

export function validateProjectEdit({
  name,
  title
}: Record<string, string>): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!name) {
    errors.name = ERROR_MESSAGES.NAME_REQUIRED;
  }

  if (!title) {
    errors.title = ERROR_MESSAGES.TITLE_REQUIRED;
  }

  return errors;
}

export function validateSingIn({
  email,
  password
}: Record<string, string>): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!password) {
    errors.password = ERROR_MESSAGES.PASSWORD_REQUIRED;
  }

  return emailValidate(errors, email);
}
