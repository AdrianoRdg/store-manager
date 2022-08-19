function serializeAllSales(data) {
  const convert = data.map((sale) => ({
    saleId: sale.sale_id,
    date: sale.date,
    productId: sale.product_id,
    quantity: sale.quantity,
  }));

  return convert;
}

function serializeSales(data) {
  const convert = data.map((sale) => ({
    date: sale.date,
    productId: sale.product_id,
    quantity: sale.quantity,
  }));

  return convert;
}

module.exports = { serializeAllSales, serializeSales };