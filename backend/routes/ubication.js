const express = require('express');
const router = express.Router();
const Ubicacion = require('../models/ubication.js');
const ubicationData = require('../assets/data/ubication.json');

// Obtener todas las ubicaciones desde la base de datos
router.get('/', async (req, res) => {
  try {
    const ubicacion = await Ubicacion.find({});
    res.json(ubicacion);
    console.log('Ubicaciones obtenidas', ubicacion)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener ubicaciones', error });
  }
});

router.get('/cargar', async (req, res) => {
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


// Cargar las ubicaciones desde el archivo JSON a MongoDB (sin duplicados)
router.post('/cargar', async (req, res) => {
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

module.exports = router;
