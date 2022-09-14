const connection = require('./connection');

async function addSale() {
  const [{ insertId }] = await connection.execute(`
  INSERT INTO StoreManager.sales(date) 
  VALUES(NOW())`);
  
  return insertId;
}

async function addSaleProducts(id, data) {
  const adingData = await data.map(async ({ productId, quantity }) => {
    await connection.execute(` 
    INSERT INTO StoreManager.sales_products(sale_id, product_id, quantity) 
    VALUES(?, ?, ?)
    `, [id, productId, quantity]);
    
    return { productId, quantity };
  });

  const dadosResult = await Promise.all(adingData);

  const salesAdded = await { id, itemsSold: [...dadosResult] };

  return salesAdded;
}

async function getAllSales() {
  const [sales] = await connection.execute(
    `SELECT sp.sale_id, s.date, sp.product_id, sp.quantity 
    FROM StoreManager.sales s JOIN StoreManager.sales_products sp ON sp.sale_id = s.id
    ORDER BY sp.sale_id, sp.product_id`,
  );
  
  return sales;
}

async function getSalesById(id) {
  const [sales] = await connection.execute(
    `SELECT s.date, sp.product_id, sp.quantity 
    FROM StoreManager.sales s 
    JOIN StoreManager.sales_products sp ON sp.sale_id = s.id
    WHERE s.id = ?`,
    [id],
  );
  
  return sales;
}

async function deleteSale(id) {
  await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?', [id],
  );
}

async function updateSales(id, sales) {
  const updatingProducts = await sales.map(async ({ productId, quantity }) => {
    await connection.execute(`
    UPDATE StoreManager.sales_products 
    SET quantity=?
    WHERE sale_id=? AND product_id=?
    `, [quantity, id, productId]);
    
    return { productId, quantity };
  });

  const dadosResult = await Promise.all(updatingProducts);

  const salesUpdated = await { saleId: Number(id), itemsUpdated: [...dadosResult] };

  return salesUpdated;
}

module.exports = {
  getAllSales,
  getSalesById,
  addSale,
  addSaleProducts,
  deleteSale,
  updateSales,
};