import { ERROR_MESSAGES } from '../constant/errors.const';
import { validEmailReg } from '../constant/variable.const';
import { StringObject } from '../types/objects.type';
import { SighInDataType, UserEditDataType } from '../types/users.type';
import { GroupEditDataType } from '../types/groups.type';

const validateMaxLength = (
  data: StringObject,
  errors: StringObject
): StringObject => {
  Object.keys(data).forEach((item) => {
    if (data[item].length > 30) {
      errors[item] = ERROR_MESSAGES.MAX_LENGTH;
    }
  });
  return errors;
};

export function validateData(
  data: StringObject,
  validator: (obj: StringObject) => StringObject
): { errors: StringObject; isValid: boolean } {
  let errors = validator(data);
  errors = validateMaxLength(data, errors);

  const isValid = !Object.values(errors).length;
  return {
    errors,
    isValid
  };
}

const emailValidate = (errors: StringObject, email: string): StringObject => {
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
}: UserEditDataType): StringObject {
  const errors: StringObject = {};
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

export function validateGroupEdit({
  name,
  title
}: GroupEditDataType): StringObject {
  const errors: StringObject = {};
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
}: SighInDataType): StringObject {
  const errors: StringObject = {};

  if (!password) {
    errors.password = ERROR_MESSAGES.PASSWORD_REQUIRED;
  }

  return emailValidate(errors, email);
}
