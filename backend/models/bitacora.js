// models/bitacora.model.js
const mongoose = require('mongoose');

const BitacoraSchema = new mongoose.Schema({
  usuario: { type: String },
  accion: { type: String }, // Ej: "crear producto", "editar stock",
  solicitud: { type: mongoose.Schema.Types.ObjectId, ref: 'Solicitud', default: null, required:false},
  producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', default: null },
  fecha: { type: Date, default: Date.now },
  detalle: String
});

module.exports = mongoose.model('Bitacora', BitacoraSchema);
