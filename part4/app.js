const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const indexRouter = require('./routes');
const middlewares = require('./middlewares');

// Set up database
require('./configs/db.config');

const app = express();

// Create custom body token for logger
const logFormatStr = (
  ':method :url :status :res[content-length] - :response-time ms :body'
);
morgan.token('body', (req) => JSON.stringify(req.body));

app.use(morgan(logFormatStr));
app.use(cors());
app.use(express.static('dist'));
app.use(express.json());

app.use('/api', indexRouter);

app.use(middlewares.notFound);
app.use(middlewares.logError);
app.use(middlewares.handleError);
// Handle unhandled rejections and uncaught exceptions

module.exports = app;
