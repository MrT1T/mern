import type { FilterObjectType } from '../types/objects.type';

export const getUniqueValue = <T>(
  obj: FilterObjectType<T>
): FilterObjectType<T> => {
  const uniqueValueObj: FilterObjectType<T> = {};
  (Object.keys(obj) as Array<keyof T>).forEach(
    (key) => (uniqueValueObj[key] = [...new Set(obj[key])])
  );
  return uniqueValueObj;
};
