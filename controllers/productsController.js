const productsService = require('../services/productsService');

async function getProducts(_req, res) {
  const response = await productsService.getProducts();
  const { code, data } = response;
  return res.status(code).json(data);
}

async function getProductById(req, res) {
  const { id } = req.params;
  const response = await productsService.getProductById(id);
  const { code, data, message } = response;

  if (message) return res.status(code).json({ message });

  return res.status(code).json(data);
}

async function addProduct(req, res) {
  const { name } = req.body;
  const product = await productsService.addProduct(name);
  const { code, data } = product;
  res.status(code).json(data);
}

async function updateProduct(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  const response = await productsService.updateProduct(name, id);
  const { code, data, message } = response;
  
  if (message) return res.status(code).json({ message });

  return res.status(code).json(data);
}

module.exports = { getProducts, getProductById, addProduct, updateProduct };