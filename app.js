const express = require('express');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const productsController = require('./controllers/productsController');
const validate = require('./middlewares/productsValidate');

app.use(express.json());

app.get('/products', productsController.getProducts);

app.get('/products/:id', productsController.getProductById);

app.post('/products', validate.productValidate, productsController.addProduct);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;