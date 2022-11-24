require('express-async-errors');
const express = require('express');
// const productsController = require('./controllers/productsController');
// const salesController = require('./controllers/salesController');
// const validate = require('./middlewares/validations');
// const search = require('./middlewares/searchProducts');
const errorMiddleware = require('./middlewares/errorMiddleware');
const mainRouter = require('./routes');

const app = express();

app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use(mainRouter);
// app.get('/products/search', productsController.getProductByQuery);
// app.get('/products', productsController.getProducts);
// app.post('/products', validate.nameValidate, productsController.addProduct);
// app.get('/products/:id', productsController.getProductById);
// app.put('/products/:id', validate.nameValidate, productsController.updateProduct);
// app.delete('/products/:id', productsController.deleteProduct);

// app.post('/sales', validate.productsValidate,
//   search.verifyProductsExistence, salesController.addSales);

// app.put('/sales/:id', validate.productsValidate,
//   search.verifyProductsExistence, salesController.updateSales);

// app.get('/sales', salesController.getAllSales);
// app.get('/sales/:id', salesController.getSalesById);
// app.delete('/sales/:id', salesController.deleteSale);

app.use(errorMiddleware);

module.exports = app;