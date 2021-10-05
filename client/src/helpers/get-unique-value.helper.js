export const getUniqueValue = (obj) => {
  const uniqueValueObj = {};
  Object.keys(obj).forEach(
    (key) => (uniqueValueObj[key] = [...new Set(obj[key].flat())])
  );
  return uniqueValueObj;
};
