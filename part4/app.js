/* eslint-disable global-require */

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const indexRouter = require('./src/routes');
const middlewares = require('./src/middlewares');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Set up prod/dev database
// Test database set up in each test suite
if (process.env.NODE_ENV !== 'test') {
  require('./src/configs/db.config');
}

const app = express();

if (process.env.NODE_ENV !== 'test') {
  const logFormatStr = (
    ':method :url :status :res[content-length] - :response-time ms :body'
  );
  morgan.token('body', (req) => JSON.stringify(req.body));
  app.use(morgan(logFormatStr));
}

app.use(helmet());
app.use(cors());
app.use(express.static('dist'));
app.use(express.json());

app.use('/api', indexRouter);

app.use(middlewares.notFound);
app.use(middlewares.logError);
app.use(middlewares.handleError);
// Handle unhandled rejections and uncaught exceptions
// process.on('uncaughtException') || process.on('unhandledRejection')

module.exports = app;
