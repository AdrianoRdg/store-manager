const express = require('express');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');
const validate = require('./middlewares/validations');

app.use(express.json());

app.get('/products', productsController.getProducts);
app.post('/products', validate.nameValidate, productsController.addProduct);
app.get('/products/:id', productsController.getProductById);
app.put('/products/:id', validate.nameValidate, productsController.updateProduct);
app.delete('/products/:id', productsController.deleteProduct);

app.post('/sales', validate.addProductValidate, salesController.addSales);
app.get('/sales', salesController.getAllSales);
app.get('/sales/:id', salesController.getSalesById);
app.delete('/sales/:id', salesController.deleteSale);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;