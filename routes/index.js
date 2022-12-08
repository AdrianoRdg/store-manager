const { Router } = require('express');
const productsRouter = require('./productsRouter');
const salesRouter = require('./salesRouter');

const mainRouter = Router();

mainRouter.use('/products', productsRouter);
mainRouter.use('/sales', salesRouter);

module.exports = mainRouter;