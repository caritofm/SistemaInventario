const mongoose = require('mongoose');

const SolicitudSchema = new mongoose.Schema({
  usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  tipo: { type: String, required: true },
  materiales: [{
    productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
    cantidad: { type: Number, required: true }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Solicitud', SolicitudSchema);
