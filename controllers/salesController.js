const salesService = require('../services/salesService');

async function getAllSales(_req, res) {
  const { code, data } = await salesService.getAllSales();
  return res.status(code).json(data);
}

async function getSalesById(req, res) {
  const { id } = req.params;
  const { code, data, message } = await salesService.getSalesById(id);

  if (message) return res.status(code).json({ message });

  return res.status(200).json(data);
}

module.exports = { getAllSales, getSalesById };