const difference = (arrFrom, arrTo) => {
  const result = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const p of arrFrom) {
    if (!arrTo.includes(p)) {
      result.push(p);
    }
  }

  return result;
};

module.exports = difference;
