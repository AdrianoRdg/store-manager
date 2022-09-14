const salesModel = require('../models/salesModel');
const serializes = require('../utils/serializes');

async function getAllSales() {
  const data = await salesModel.getAllSales();
  
  const convertData = serializes.serializeAllSales(data);
  
  return { code: 200, data: convertData };
}

async function getSalesById(id) {
  const data = await salesModel.getSalesById(id);

  if (!data.length) return { code: 404, message: 'Sale not found' };

  const convertData = serializes.serializeSales(data);
  
  return { code: 200, data: convertData };
}

async function addSales(bodyData) {
  const id = await salesModel.addSale();
  
  const data = await salesModel.addSaleProducts(id, bodyData);

  return { code: 201, data };
}

async function deleteSale(id) {
  // const { code, message } = await getSalesById(id);
  
  // if (message) return { code, message };
  const data = await salesModel.getSalesById(id);

  if (!data.length) return { code: 404, message: 'Sale not found' };

  await salesModel.deleteSale(id);
  return { code: 204 };
}

async function updateSales(id, dataBody) {
  // const { code, message } = await getSalesById(id);

  // if (message) return { code, message };
  const verify = await salesModel.getSalesById(id);

  if (!verify.length) return { code: 404, message: 'Sale not found' };

  const data = await salesModel.updateSales(id, dataBody);

  return { code: 200, data };
}

module.exports = { getAllSales, getSalesById, addSales, deleteSale, updateSales };