const { Router } = require('express');
const salesController = require('../controllers/salesController');
const validate = require('../middlewares/validations');
const search = require('../middlewares/searchProducts');

const salesRouter = Router();

salesRouter.get('/sales', salesController.getAllSales);
salesRouter.get('/sales/:id', salesController.getSalesById);
salesRouter.post('/sales', validate.productsValidate,
  search.verifyProductsExistence, salesController.addSales);
salesRouter.put('/sales/:id', validate.productsValidate,
  search.verifyProductsExistence, salesController.updateSales);
salesRouter.delete('/sales/:id', salesController.deleteSale);

module.exports = salesRouter;