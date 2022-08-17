const schema = require('./schemas');

function nameValidate(req, res, next) {
  const { error } = schema.productSchema.validate(req.body);
  if (error) {
    const [code, message] = error.message.split('|');
    return res.status(Number(code)).json({ message });
  }
  
  next();
}

function addProductValidate(req, res, next) {
  const data = req.body;
  
  const verifyValidation = data.map((a) => {
    const { value, error } = schema.addProductSchema.validate(a);
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

module.exports = { nameValidate, addProductValidate };