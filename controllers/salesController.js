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

async function addSales(req, res) {
  const dados = req.body;
 
  const { code, data, message } = await salesService.addSales(dados);

  if (message) return res.status(code).json({ message });

  return res.status(code).json(data);
}

async function deleteSale(req, res) {
  const { id } = req.params;
  console.log('oi');
  const { code, message } = await salesService.deleteSale(id);
  
  if (message) return res.status(code).json({ message });

  return res.status(code).send();
}

module.exports = { getAllSales, getSalesById, addSales, deleteSale };