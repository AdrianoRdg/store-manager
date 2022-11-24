require('express-async-errors');
const express = require('express');
const errorMiddleware = require('./middlewares/errorMiddleware');
const mainRouter = require('./routes');

const app = express();

app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use(mainRouter);
app.use(errorMiddleware);

module.exports = app;