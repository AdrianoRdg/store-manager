const connection = require('./connection');

async function getAll() {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return products;
}

async function getOneById(id) {
  const [[product]] = await connection.execute(`
  SELECT * FROM StoreManager.products WHERE id=?
  `, [id]);
  return product;
}

module.exports = { getAll, getOneById };
