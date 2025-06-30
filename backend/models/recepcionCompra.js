const mongoose = require('mongoose');

const RecepcionCompraSchema = new mongoose.Schema({
  orden_compra: { type: mongoose.Schema.Types.ObjectId, ref: 'OrdenCompra' },
  fecha_recepcion: { type: Date, default: Date.now },
  detalle: [{
    producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
    cantidad_recibida: Number
  }]
});

module.exports = mongoose.model('RecepcionCompra', RecepcionCompraSchema);
