// regras de negocio
const productModel = require('../models/productsModel');

async function getProducts() {
  const data = await productModel.getAll();
  return { code: 200, data };
}

async function getProductById(id) {
  const data = await productModel.getOneById(id);

  if (!data) return { code: 404, message: 'Product not found' };
  return { code: 200, data };
}

async function addProduct(product) {
  const data = await productModel.insertProduct(product);
  return { code: 201, data };
}

async function updateProduct(product, id) {
  const { code, message } = await getProductById(id);

  if (message) return { code, message };
  
  const data = await productModel.updateProduct(product, id);
   
  return { code: 200, data };
}

module.exports = { getProducts, getProductById, addProduct, updateProduct };