function errorMiddleware(_err, _req, res, _next) {
  return res.status(500).json({ message: 'Erro interno' });
}

module.exports = errorMiddleware;