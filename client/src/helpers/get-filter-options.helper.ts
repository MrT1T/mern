import type { FilterObjectType } from '../types/objects.type';

export const getFilterOptions = <T>(
  options: Array<T>,
  keys: Array<keyof T>
): FilterObjectType<T> => {
  if (options.length === 0) {
    return {};
  }

  return keys.reduce((prevObj, key) => {
    const value = options.map((obj) => obj[key]);
    return { ...prevObj, [key]: value };
  }, {});
};
