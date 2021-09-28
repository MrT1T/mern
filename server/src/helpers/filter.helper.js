const filter = (array, key, searchElement) =>
  array.filter((item) =>
    item[key].toLowerCase().includes(searchElement.toLowerCase())
  );

const listFilter = (array, key, searchElement) =>
  array.filter((item) =>
    item[key].some((el) =>
      el.toLowerCase().includes(searchElement.toLowerCase())
    )
  );

module.exports = { filter, listFilter };
