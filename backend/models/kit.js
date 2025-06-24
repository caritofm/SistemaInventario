// models/kit.model.js
const mongoose = require('mongoose');

const KitSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: String,
  componentes: [
    {
      producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
      cantidad: { type: Number }
    }
  ]
});

module.exports = mongoose.model('Kit', KitSchema);
