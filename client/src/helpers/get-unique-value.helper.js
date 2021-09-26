export const getUniqueValue = (obj) => {
  const uniqueValueObj = {};
  Object.keys(obj).map(
    // eslint-disable-next-line no-return-assign
    (key) => (uniqueValueObj[key] = [...new Set(obj[key].flat())])
  );
  return uniqueValueObj;
};
