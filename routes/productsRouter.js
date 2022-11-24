const { Router } = require('express');
const productsController = require('../controllers/productsController');
const validate = require('../middlewares/validations');

const productsRouter = Router();

productsRouter.get('/search', productsController.getProductByQuery);
productsRouter.get('/', productsController.getProducts);
productsRouter.get('/:id', productsController.getProductById);
productsRouter.post('/', validate.productsValidate, productsController.addProduct);
productsRouter.put('/:id', validate.nameValidate, productsController.updateProduct);
productsRouter.delete('/:id', productsController.deleteProduct);

module.exports = productsRouter;