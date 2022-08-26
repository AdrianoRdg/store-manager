const schema = require('./schemas');

function nameValidate(req, res, next) {
  const { error } = schema.productSchema.validate(req.body);
  if (error) {
    const [code, message] = error.message.split('|');
    return res.status(Number(code)).json({ message });
  }
  
  next();
}

function productsValidate(req, res, next) {
  const products = req.body;
  
  const verifyValidation = products.map((index) => {
    const { value, error } = schema.addProductSchema.validate(index);
    if (error) {
      const [code, message] = error.message.split('|');
      return { code, message };
    }
    return value;
  });
  
  const findMessage = verifyValidation.find((i) => i.message);

  if (findMessage !== undefined) {
    const { code, message } = findMessage;
    return res.status(Number(code)).json({ message });
  }

  next();
}

module.exports = { nameValidate, productsValidate };