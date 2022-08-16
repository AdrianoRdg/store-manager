const schema = require('./productsSchema');

function productValidate(req, res, next) {
  const { error } = schema.productSchema.validate(req.body);
  if (error) {
    const [code, message] = error.message.split('|');
    return res.status(Number(code)).json({ message });
  }
  
  next();
}

module.exports = { productValidate };