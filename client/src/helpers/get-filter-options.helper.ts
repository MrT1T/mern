import type { FilterObjectType } from '../types/objects.type';

export const getFilterOptions = <T>(options: Array<T>): FilterObjectType<T> => {
  if (options.length === 0) {
    return {};
  }
  const keysArr = Object.keys(options[0]) as Array<keyof T>;

  return keysArr.reduce((prevObj, key) => {
    const value = options.map((obj) => obj[key]);
    return { ...prevObj, [key]: value };
  }, {});
};
