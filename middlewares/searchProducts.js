const productsService = require('../services/productsService');

async function verifyProductsExistence(req, res, next) {
  const products = req.body;

  const verifyProducts = products.map(async (product) => {
    const { code, message } = await productsService.getProductById(product.productId);

    if (message) return { code, message };

    return product;
  });

  const verifiedProducts = await Promise.all(verifyProducts);

  const findMessage = verifiedProducts.find(({ message }) => message);

  if (findMessage) {
    const { code, message } = findMessage;

    return res.status(code).json({ message });
  }

  next();
}

module.exports = { verifyProductsExistence };