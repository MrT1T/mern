const difference = (arrFrom, arrTo) => {
  const result = [];
  for (const p of arrFrom) {
    if (!arrTo.includes(p)) {
      result.push(p);
    }
  }

  return result;
};

module.exports = difference;
