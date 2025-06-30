const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    codigo: {type:String, required:true},
    nombre:{type:String, required:true},
    categoria: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Categoria',
        required:true },
    stock :{type:Number, required:true, default:0},
    stockmin:{type:Number,  default:50},
    ubicacion:{type: mongoose.Schema.Types.ObjectId,
        ref:'Ubicacion',
        required:true
    },
    fechaVencimiento: {type:Date, default:null},
    foto: {type:String}

},{
    timestamps: true
});



module.exports = mongoose.model('Producto', productoSchema);