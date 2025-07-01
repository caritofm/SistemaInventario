const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Movimiento = require('../models/movimientosInventario');
const { authenticateToken } = require('../middlewares/autenticateToken');
const { authorizeRoles } = require('../middlewares/auth.middleware');
const registrarEnBitacora = require('../services/bitacoralogger');

router.get('/', authenticateToken, authorizeRoles(['admin', 'gestor']), async (req, res) => {
  try {
    // Poblamos usuario_id y producto_id para obtener datos completos
    const movimientos = await Movimiento.find()
      .populate('usuario_id', 'nombre')
      .populate('producto_id', 'nombre');

    // Verificar movimientos sin usuario (debugging)
    movimientos.forEach(m => {
      if (!m.usuario_id) {
        console.log('Movimiento sin usuario:', m._id);
      }
    });

    res.json(movimientos);
    console.log('Movimientos:', movimientos);
    
  } catch (error) {
    console.error('Error al obtener movimientos:', error);
    res.status(500).json({ message: 'Error al obtener movimientos', error });
  }
});

//entrada de productos total

router.get('/entrada/total', authenticateToken, authorizeRoles(['admin', 'gestor']), async (req, res) => {
    try{
        const totalEntrada = await Movimiento.countDocuments({ tipo: "Entrada" });
        res.json({ totalEntrada});
    }catch(error){
        console.log('Error al obtener  total de entradas', error);
        res.status(500).json({mensaje:'Error al obtener el total de entradas'})

    }
});

//salida de productos total 
router.get('/salida/total',authenticateToken, authorizeRoles(['admin', 'gestor']), async (req, res) => {
    try{
       const salidaTotal = await Movimiento.countDocuments({tipo: "Salida"})
       res.json({salidaTotal});
    }catch(error){
        console.log('Error al obtener  total de Salida', error);
        res.status(500).json({mensaje:'Error al obtener el total de salidas'})

    }
});






router.post('/', authenticateToken, authorizeRoles(['admin', 'gestor']), async (req, res) => {
  try {
    const { producto_id, tipo, cantidad, fecha, motivo } = req.body;

    console.log('🟢 Iniciando POST');
    console.log('Body recibido:', req.body);
    console.log('Usuario desde token:', req.user);
    

    // Crear nuevo movimiento
    const nuevo = new Movimiento({
      producto_id,
      tipo,
      cantidad,
      usuario_id: req.user.id, // ← Usamos el ID desde el token
      fecha,
      motivo
    });

    console.log('🟢 Objeto creado:', nuevo);

    await nuevo.save();

    // Registrar en bitácora
    try {
        await registrarEnBitacora({
            usuario: req.user.nombre,
            accion: `Movimiento de tipo ${nuevo.tipo}`,
            producto: nuevo.producto_id,
            detalle: `Cantidad: ${nuevo.cantidad}. Motivo: ${nuevo.motivo}`
        });

        console.log('✅ Bitácora registrada correctamente');
    } catch (err) {
        console.error('❌ Error al registrar bitácora:', err.message);
    }


    res.status(201).json(nuevo);
  } catch (err) {
    console.error('❌ ERROR COMPLETO:', err);
    res.status(500).json({ mensaje: 'Error al guardar movimiento', error: err.message });
  }
});

module.exports = router;

