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

const prod = require('./productsService');

async function addSales(bodyData) {
  const verifyProducts = bodyData.map(async (product) => {
    const { code, message } = await prod.getProductById(product.productId);
    if (message) return { code, message };
    return product;
  });

  const verifiedProducts = await Promise.all(verifyProducts);
 
  const message = verifiedProducts.find((i) => i.message);
  
  if (message) return message;

  const data = await salesModel.addSales(verifiedProducts);

  return { code: 201, data };
}

async function deleteSale(id) {
  const { code, message } = await getSalesById(id);
  
  if (message) return { code, message };

  await salesModel.deleteSale(id);
  return { code: 204 };
}

module.exports = { getAllSales, getSalesById, addSales, deleteSale };