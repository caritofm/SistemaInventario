// models/Notificacion.js
const mongoose = require('mongoose');

const notificacionSchema = new mongoose.Schema({
  usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  mensaje: { type: String, required: true },
  tipo: { type: String, enum: [ 'Aprobada', 'Rechazada'], required: true },
  leida: { type: Boolean, default: false },
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notificacion', notificacionSchema);
