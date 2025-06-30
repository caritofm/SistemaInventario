const mongoose = require('mongoose');

const compraSchema = new mongoose.Schema({
  proveedorId: {type: mongoose.Schema.Types.ObjectId,ref: 'Proveedores',required: true},
  usuarioId: {type: mongoose.Schema.Types.ObjectId,ref: 'Usuario',required: true},
  fecha: {type: Date,default: Date.now},
  estado: {type: String,enum: ['Pendiente', 'Aprobada', 'Cancelada'],default: 'Pendiente'},
  condicionesPago: {type: String, enum:['Contado', 'Credito', 'Debito'] },
  total: Number,
  productos: [
    {
      productoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto',
        required: true
      },
      cantidad: Number,
      precioUnitario: Number
    }
  ]
});

module.exports = mongoose.model('Compra', compraSchema);

