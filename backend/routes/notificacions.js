const express = require('express');
const router = express.Router();
const Notificacion = require('../models/notificacion'); // ajusta la ruta si es necesario

router.get('/:usuario_id', async (req, res) => {
  try {
    const notis = await Notificacion.find({ usuario_id: req.params.usuario_id }).sort({ fecha: -1 });;
    console.log('Id recibido', req.params.usuario_id)
    

    res.json(notis);
    console.log('notis', notis)
  } catch (error) {
    console.error('Error al obtener notificaciones:', error);
    res.status(500).json({ message: 'Error interno' });
  }
});

module.exports = router;
