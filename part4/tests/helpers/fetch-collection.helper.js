const mongoose = require('mongoose');

// Verify the state of a database when running a test
const fetchCollection = async (collectionName) => {
  // Fetch all documents for a particular collection
  const allDocs = await mongoose
    .model(collectionName)
    .find({})
    .exec();

  // Format each doc as a call to response.json would
  return allDocs.map((doc) => doc.toJSON());
};

module.exports = fetchCollection;
