const express = require('express');
const router = express.Router();
const Bitacora = require('../models/bitacora');
const { authenticateToken } = require('../middlewares/autenticateToken');
const { authorizeRoles } = require('../middlewares/auth.middleware')

// 📥 Obtener todas las entradas de bitácora
router.get('/', authenticateToken,authorizeRoles(['admin']), async (req, res) => {
  try {
    const registros = await Bitacora.find().sort({ fecha: -1 }).populate('producto');
    res.json(registros);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener bitácora' });
  }
});
router.get('/ultimas',authenticateToken,authorizeRoles(['admin']), async (req, res) => {
  try {
    const ultimas = await Bitacora.find()
      .populate('usuario', 'nombre') // si quieres mostrar nombre del usuario
      .sort({ fecha: -1 })            // ordenar por fecha descendente
      .limit(5);                      // solo 5 registros
    res.json(ultimas);
  } catch (error) {
    console.error('Error al obtener últimas acciones:', error);
    res.status(500).json({ mensaje: 'Error al obtener historial' });
  }
});

module.exports = router;
