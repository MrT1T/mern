export const getFilterOptions = (options) => {
  if (options.length === 0) {
    return {};
  }
  const keysArr = Object.keys(options[0]);
  return keysArr.reduce((prevObj, key) => {
    const value = options.map((obj) => obj[key]);
    return { ...prevObj, [key]: value };
  }, {});
};
