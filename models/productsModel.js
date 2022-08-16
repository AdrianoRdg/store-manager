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

async function insertProduct(product) {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)', [product],
  );
  return { id: insertId, name: product };
}

async function updateProduct(name, id) {
  await connection.execute(
    `UPDATE StoreManager.products  
    SET name=?
    WHERE id=?`,
    [name, id],
  );
  
  return { id, name };
}

module.exports = { getAll, getOneById, insertProduct, updateProduct };
