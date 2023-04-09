const dbHelper = require('./db.helper');
const fetchCollectionHelper = require('./fetch-collection.helper');
const seedMultipleHelper = require('./seed-multiple.helper');

module.exports = {
  db: dbHelper,
  fetchCollection: fetchCollectionHelper,
  seedMultiple: seedMultipleHelper,
};
