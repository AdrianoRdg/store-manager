const schema = require('./schemas');

function nameValidate(req, res, next) {
  const { error } = schema.productSchema.validate(req.body);
  if (error) {
    const [code, message] = error.message.split('|');
    return res.status(Number(code)).json({ message });
  }
  
  next();
}

module.exports = { nameValidate };