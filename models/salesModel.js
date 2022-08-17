const connection = require('./connection');

async function addSales(data) {
  const [{ insertId }] = await connection.execute(`
  INSERT INTO StoreManager.sales(date) 
  VALUES(NOW())`);
  
  const adingData = await data.map(async ({ productId, quantity }) => {
    await connection.execute(` 
    INSERT INTO StoreManager.sales_products(sale_id, product_id, quantity) 
    VALUES(?, ?, ?)
    `, [insertId, productId, quantity]);
    
    return { productId, quantity };
  });

  const dadosResult = await Promise.all(adingData);

  const salesAdded = await { id: insertId, itemsSold: [...dadosResult] };

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

module.exports = { getAllSales, getSalesById, addSales };