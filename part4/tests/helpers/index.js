const dbHelper = require('./db.helper');
const seedMultipleHelper = require('./seedMultiple.helper');

module.exports = {
  db: dbHelper,
  seedMultiple: seedMultipleHelper,
};
