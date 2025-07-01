// models/lote.model.js
const mongoose = require('mongoose');

const LoteSchema = new mongoose.Schema({
  producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
  cantidad: { type: Number, required: true },
  fechaIngreso: { type: Date, default: Date.now },
  fechaVencimiento: { type: Date, required: true },
  estado: { type: String, enum: ['vigente', 'vencido'], default: 'vigente' }
});

module.exports = mongoose.model('Lote', LoteSchema);
