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

module.exports = { getProducts, getProductById };