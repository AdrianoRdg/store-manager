const salesModel = require('../models/salesModel');

async function getAllSales() {
  const data = await salesModel.getAllSales();
  
  const convert = data.map((sale) => ({
      saleId: sale.sale_id,
      date: sale.date,
      productId: sale.product_id,
      quantity: sale.quantity,
  }));
  
  return { code: 200, data: convert };
}

async function getSalesById(id) {
  const data = await salesModel.getSalesById(id);

  if (!data.length) return { code: 404, message: 'Sale not found' };

  const convert = data.map((sale) => ({
      date: sale.date,
      productId: sale.product_id,
      quantity: sale.quantity,
  }));
  
  return { code: 200, data: convert };
}

module.exports = { getAllSales, getSalesById };