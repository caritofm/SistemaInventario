const express = require('express');
const router = express.Router();
const Compra = require('../models/ordenCompras');
const Producto = require('../models/producto');
const Bitacora = require('../models/bitacora');
const Bitacoralogger = require('../services/bitacoralogger');
const { authenticateToken } = require('../middlewares/autenticateToken');
const Notificacion = require('../models/notificacion');

// 📌 Ruta para registrar nueva compra
router.post('/', async (req, res) => {
  try {
    const nuevaCompra = new Compra(req.body);
    await nuevaCompra.save();
    res.status(201).json({ mensaje: 'Compra registrada', compra: nuevaCompra });
  } catch (error) {
    console.error('Error al registrar compra:', error);
    res.status(500).json({ mensaje: 'Error al registrar compra' });
  }
});

// 📌 Ruta para aprobar compra (actualiza stock y registra movimientos)
router.put('/aprobar/:id',authenticateToken, async (req, res) => {
  try {
    const compra = await Compra.findById(req.params.id);
    if (!compra) return res.status(404).json({ mensaje: 'Compra no encontrada' });

    // Actualizar stock por cada producto
    for (const item of compra.productos) {
      await Producto.findByIdAndUpdate(item.productoId, {
        $inc: { stock: item.cantidad }
      });
    }

    compra.estado = 'Aprobada';
    await compra.save();

    // Obtener los nombres de productos
        const nombresProductos = [];

        for (const item of compra.productos) {
        const producto = await Producto.findById(item.productoId);
        if (producto) {
            nombresProductos.push(producto.nombre + ' (' + item.cantidad + ')');
        }
        }

        const detalleTexto = ` Productos: ${nombresProductos.join(', ')}`;

        // Registrar en bitácora
        await Bitacoralogger({
        usuario: req.user.nombre,
        accion: 'Aprobó una compra',
        detalle: ` ${detalleTexto}`
        });

        await Notificacion.create({
            usuario_id: compra.usuarioId, // asegúrate que compra.usuarioId esté poblado
            mensaje: `Tu orden de compra ha sido aprobada.`,
            tipo: 'Aprobada',
            leida: false
        });


    res.json({ mensaje: 'Compra aprobada y stock actualizado' });
  } catch (error) {
    console.error('Error al aprobar compra:', error);
    res.status(500).json({ mensaje: 'Error al aprobar compra' });
  }
});

// 📌 Ruta para obtener compras
router.get('/', async (req, res) => {
  try {
    const compras = await Compra.find()
      .populate('proveedorId', 'nombre')
      .populate('usuarioId', 'nombre')
      .populate('productos.productoId', 'nombre');
    res.json(compras);
  } catch (error) {
    console.error('Error al obtener compras:', error);
    res.status(500).json({ mensaje: 'Error al obtener compras' });
  }
});

module.exports = router;
