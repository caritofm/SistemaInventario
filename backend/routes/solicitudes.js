const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Solicitud = require('../models/solicitud');
const Notificacion = require('../models/notificacion');
const Usuario = require('../models/usuarios');
const { authenticateToken } = require('../middlewares/autenticateToken');
const { authorizeRoles } = require('../middlewares/auth.middleware');
const registrarEnBitacora = require('../services/bitacoralogger');




router.get('/',authenticateToken, authorizeRoles(['admin']), async (req, res) => {
  try {
    // Poblamos usuario_id para obtener datos completos del usuario
    const solicitudes = await Solicitud.find().populate('usuario_id', 'nombre').populate('materiales.productoId');

    solicitudes.forEach(s => {
      if (!s.usuario_id) {
        console.log('Solicitud sin usuario:', s._id);
      }
    });

    res.json(solicitudes);
    console.log('Solicitudes:', solicitudes)
  } catch (error) {
    console.error('Error al obtener solicitudes:', error);
    res.status(500).json({ message: 'Error al obtener solicitudes', error });
  }
});
//solicitudes total
router.get('/total', authenticateToken, authorizeRoles(['admin']), async (req, res) => {
  try {
    const totalSolicitudes = await Solicitud.countDocuments();
    res.json({ totalSolicitudes });
  } catch (error) {
    console.error('Error al contar solicitudes:', error);
    res.status(500).json({ mensaje: 'Error al obtener total de solicitudes' });
  }
});







// Aprobar solicitud
router.post('/aprobar/:id', async (req, res) => {
  console.log('POST /aprobar/:id recibida, id:', req.params.id);

  try {
    const id = req.params.id;

    // Validar formato del ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    // Buscar la solicitud
    const solicitud = await Solicitud.findById(id);
    if (!solicitud) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }

    // Verificar usuario_id
    if (!solicitud.usuario_id || !mongoose.Types.ObjectId.isValid(solicitud.usuario_id)) {
      console.log('usuario_id inválido:', solicitud.usuario_id);
      return res.status(400).json({ message: 'La solicitud no tiene un usuario válido' });
    }

    // Buscar al usuario
    const usuario = await Usuario.findById(solicitud.usuario_id);
    if (!usuario) {
      console.log('Usuario asociado no encontrado con ID:', solicitud.usuario_id);
      return res.status(404).json({ message: 'Usuario asociado no encontrado' });
    }

    // Crear la notificación
    const noti = new Notificacion({
      usuario_id: usuario._id,
      mensaje: `Tu solicitud de tipo "${solicitud.tipo}" fue aprobada.`,
      tipo: 'Aprobada'
    });

    await noti.save();
    await Solicitud.findByIdAndDelete(id);
    res.json({ message: 'Solicitud aprobada y notificación enviada' });

  } catch (error) {
    console.error('Error al aprobar solicitud:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});


// Rechazar solicitud
router.post('/rechazar/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // Validar formato del ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    // Buscar la solicitud
    const solicitud = await Solicitud.findById(id);
    if (!solicitud) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }

    // Validar usuario_id
    if (!solicitud.usuario_id || !mongoose.Types.ObjectId.isValid(solicitud.usuario_id)) {
      return res.status(400).json({ message: 'La solicitud no tiene un usuario válido' });
    }

    // Buscar al usuario
    const usuario = await Usuario.findById(solicitud.usuario_id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario asociado no encontrado' });
    }

    // Crear la notificación
    const noti = new Notificacion({
      usuario_id: usuario._id,
      mensaje: `Tu solicitud de tipo "${solicitud.tipo}" fue rechazada.`,
      tipo: 'Rechazada'
    });

    await noti.save();
    await Solicitud.findByIdAndDelete(id);

    res.json({ message: 'Solicitud rechazada y notificación enviada' });

  } catch (error) {
    console.error('Error al rechazar solicitud:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});


// Crear nueva solicitud
router.post('/',
  authenticateToken,
  authorizeRoles(['admin', 'gestor']),
  async (req, res) => {
    try {
      const { tipo, materiales } = req.body;

      if (!req.usuarioId) {
        return res.status(401).json({ error: 'Usuario no autenticado' });
      }

      if (!Array.isArray(materiales) || materiales.length === 0) {
        return res.status(400).json({ error: 'Debes proporcionar al menos un material' });
      }

      const solicitud = new Solicitud({
        usuario_id: req.usuarioId,
        tipo,
        materiales
      });

      const resultado = await solicitud.save();

      // ✅ Registrar después de guardar exitosamente
      try {
        if (req.user?.nombre) {
          await registrarEnBitacora({
            usuario: req.user.nombre,
            accion: 'Solicitud creada',
            solicitud: resultado._id, // ✅ Usar resultado._id
            detalle: `Solicitud creada - Tipo: ${tipo}`
          });
        }
      } catch (bitacoraError) {
        // ✅ Manejo separado del error de bitácora
        console.error('Error al registrar en bitácora:', bitacoraError);
        // No fallar la respuesta por error de bitácora
      }

      res.status(201).json(resultado);

    } catch (error) {
      console.error('Error al crear solicitud:', error);
      res.status(500).json({
        mensaje: 'Error al guardar solicitud',
        error: error.message
      });
    }
  }
);






// Eliminar solicitud por ID
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const result = await Solicitud.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }

    res.json({ message: 'Solicitud eliminada correctamente', id });
  } catch (error) {
    console.error('Error al eliminar solicitud:', error);
    res.status(500).json({ message: 'Error al eliminar solicitud', error });
  }
});

module.exports = router;
