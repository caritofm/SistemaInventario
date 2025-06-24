const express = require('express');
const router = express.Router();
const Kit = require('../models/kit');
const { authenticateToken  } = require('../middlewares/autenticateToken');
const { authorizeRoles } = require('../middlewares/auth.middleware');


// 🔄 Crear nuevo kit
router.post('/', authenticateToken, authorizeRoles(['admin', 'gestor']), async (req, res) => {
  try {
    const { nombre, descripcion, componentes } = req.body;

    const nuevoKit = new Kit({
      nombre,
      descripcion,
      componentes
    });

    await nuevoKit.save();
    await registrarEnBitacora({
        usuario: req.user.nombre,
        accion: 'crear_kit',
        detalle: `Kit creado: ${nombre} con ${componentes.length} componentes`
    });

    res.status(201).json({ mensaje: 'Kit creado correctamente', kit: nuevoKit });

  } catch (error) {
    console.error('Error al crear kit:', error.message);
    res.status(500).json({ mensaje: 'Error interno', error: error.message });
  }
});

// 📥 Obtener todos los kits
router.get('/', authenticateToken, async (req, res) => {
  try {
    const kits = await Kit.find().populate('componentes.producto');
    res.json(kits);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener kits' });
  }
});

module.exports = router;
