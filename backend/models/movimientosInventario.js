const mongoose = require('mongoose');

const movimientosSchema = new mongoose.Schema({
    producto_id: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Producto',
            required:true },
    tipo:{type:String, enum: ['Entrada', 'Salida'], required:true},
    cantidad: {type:Number, required:true},
    usuario_id:{ type:mongoose.Schema.Types.ObjectId, ref:'Usuario', required:true},
    fecha: {type:Date, default: Date.now},
    motivo:{type:String}

});

module.exports = mongoose.model('Movimientos', movimientosSchema);