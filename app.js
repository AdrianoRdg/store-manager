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

app.get('/products/:id', productsController.getProductById);

app.post('/products', validate.nameValidate, productsController.addProduct);

// app.post('/sales', async (req, res) => {
//   const { productId, quantity } = req.body;
//   const as = await add.addSale(productId, quantity);
//   return res.status(201).json(as);
// });

app.get('/sales', salesController.getAllSales);
app.get('/sales/:id', salesController.getSalesById);

app.put('/products/:id', validate.nameValidate, productsController.updateProduct);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;