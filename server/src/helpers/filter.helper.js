const regField = (obj) =>
  Object.keys(obj).reduce(
    (newObj, key) => ({ ...newObj, [key]: new RegExp(`${obj[key]}`, 'i') }),
    {}
  );

module.exports = { regField };
