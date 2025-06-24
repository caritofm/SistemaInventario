const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  jwt.verify(token, 'secreto123', (err, user) => {
    if (err) {
      return res.status(403).json({ mensaje: 'Token inválido' });
    }

    req.user = user; // { id, rol, nombre }
    next();
  });
}

module.exports = { authenticateToken };
