// Using await inside a for-loop makes the async function work
// synchronously, so this function is an optimization
const seedMultiple = async (fn, qty) => {
  const promises = [];

  /* eslint-disable no-plusplus */
  for (let i = 0; i < qty; i++) {
    promises.push(fn());
  }

  await Promise.all(promises);
};

module.exports = seedMultiple;
