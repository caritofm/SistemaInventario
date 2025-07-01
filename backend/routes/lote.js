const express = require('express');
const router = express.Router();
const Lote = require('../models/lotes');
const { authenticateToken } = require('../middlewares/autenticateToken');
const { authorizeRoles } = require('../middlewares/auth.middleware');
const registrarEnBitacora = require('../services/bitacoralogger');

// 🔄 Crear nuevo lote
router.post('/', authenticateToken, authorizeRoles(['admin', 'gestor']), async (req, res) => {
  try {
    const { producto, cantidad, fechaVencimiento } = req.body;

    const nuevoLote = new Lote({
      producto,
      cantidad,
      fechaVencimiento
    });

    await nuevoLote.save();

    await registrarEnBitacora({
        usuario: req.user.nombre,
        accion: 'crear_lote',
        producto: nuevoLote.producto,
        detalle: `Se ingresó un lote de ${nuevoLote.cantidad} unidades con vencimiento ${nuevoLote.fechaVencimiento}`
    });
    res.status(201).json({ mensaje: 'Lote creado correctamente', lote: nuevoLote });

  } catch (error) {
    console.error('Error al crear lote:', error.message);
    res.status(500).json({ mensaje: 'Error interno', error: error.message });
  }
});

// 📥 Obtener todos los lotes
router.get('/', authenticateToken, async (req, res) => {
  try {
    const lotes = await Lote.find().populate('producto');
    res.json(lotes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener lotes' });
  }
});

module.exports = router;
