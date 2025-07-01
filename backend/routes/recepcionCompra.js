const express = require('express');
const router = express.Router();
const RecepcionCompra = require('../models/recepcionCompra')



router.post('/recepcion', async (req, res) => {
  const { orden_compra, detalle } = req.body;

  try {
    const recepcion = new RecepcionCompra({ orden_compra, detalle });
    await recepcion.save();

    // Actualizar stock
    for (const item of detalle) {
      await Producto.findByIdAndUpdate(item.producto, {
        $inc: { stock: item.cantidad_recibida }
      });
    }

    // Cambiar estado a "entregada"
    await OrdenCompra.findByIdAndUpdate(orden_compra, { estado: 'entregada' });

    res.json({ mensaje: 'Recepción registrada y stock actualizado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
