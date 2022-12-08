const { Router } = require('express');
const salesController = require('../controllers/salesController');
const validate = require('../middlewares/validations');
const search = require('../middlewares/searchProducts');

const salesRouter = Router();

salesRouter.get('/', salesController.getAllSales);
salesRouter.get('/:id', salesController.getSalesById);
salesRouter.post('/', validate.productsValidate,
  search.verifyProductsExistence, salesController.addSales);
salesRouter.put('/:id', validate.productsValidate,
  search.verifyProductsExistence, salesController.updateSales);
salesRouter.delete('/:id', salesController.deleteSale);

module.exports = salesRouter;