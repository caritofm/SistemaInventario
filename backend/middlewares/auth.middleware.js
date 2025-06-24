function authorizeRoles(rolesPermitidos) {
  return (req, res, next) => {
    const rol = req.user?.rol;

    if (!rol || !rolesPermitidos.includes(rol)) {
      return res.status(403).json({ mensaje: 'Acceso denegado: rol insuficiente' });
    }

    next();
  };
}

module.exports = { authorizeRoles };
