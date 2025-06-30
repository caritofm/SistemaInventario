const express = require('express');
const router = express.Router();
const Ubicacion = require('../models/ubication.js');
const ubicationData = require('../assets/data/ubication.json');
const { authenticateToken } = require('../middlewares/autenticateToken');
const { authorizeRoles } = require('../middlewares/auth.middleware');

// Obtener todas las ubicaciones desde la base de datos
router.get('/', authenticateToken, authorizeRoles(['admin', 'gestor']), async (req, res) => {
  try {
    const ubicacion = await Ubicacion.find({});
    res.json(ubicacion);
    console.log('Ubicaciones obtenidas', ubicacion)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener ubicaciones', error });
  }
});



router.get('/ubicaciones', authenticateToken, authorizeRoles(['admin', 'gestor']), async (req, res) => {
  try {
    const ubicaciones = await Ubicacion.find().populate('categoria', 'nombreCategoria');
    console.log('Ubicaciones obtenidas', ubicaciones)
    res.json(ubicaciones);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener ubicaciones' });
  }
});



router.get('/cargar', authenticateToken, authorizeRoles(['admin', 'gestor']), async (req, res) => {
  try {
    let insertadas = 0;
    for (const ubi of ubicationData) {
      const existe = await Ubicacion.findOne({ nombreUbicacion: ubi.nombreUbicacion });
      if (!existe) {
        await Ubicacion.create(ubi);
        insertadas++;
      }
    }
    res.json({ mensaje: `Ubicaciones cargadas: ${insertadas}` });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al cargar ubicaciones', error });
  }
});





router.post('/cargar', authenticateToken, authorizeRoles(['admin', 'gestor']), async (req, res) => {
  try {
    let insertadas = 0;
    for (const ubi of ubicationData) {
      const existe = await Ubicacion.findOne({ nombreUbicacion: ubi.nombreUbicacion });
      if (!existe) {
        const nuevaUbi = {
          ...ubi,
          categoria: mongoose.Types.ObjectId(ubi.categoria)
        };
        await Ubicacion.create(nuevaUbi);
        insertadas++;
      }
    }
    res.json({ mensaje: `Ubicaciones cargadas: ${insertadas}` });
  } catch (error) {
    console.error('Error al cargar ubicaciones:', error);
    res.status(500).json({ mensaje: 'Error al cargar ubicaciones', error: error.toString() });
  }
});

module.exports = router;
