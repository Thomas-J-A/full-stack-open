require('dotenv').config();

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || undefined;

module.exports = {
  PORT,
  MONGODB_URI,
};
