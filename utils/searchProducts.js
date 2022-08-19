const prod = require('../services/productsService');

async function searchProducts(bodyData) {
  const verifyProducts = bodyData.map(async (product) => {
    const { code, message } = await prod.getProductById(product.productId);
    if (message) return { code, message };
    return product;
  });

  const verifiedProducts = await Promise.all(verifyProducts);

  const message = verifiedProducts.find((i) => i.message);

  if (message) return message;

  return verifiedProducts;
}

module.exports = { searchProducts };