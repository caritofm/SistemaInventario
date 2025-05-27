const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    codigo: {type:String, required:true},
    nombre:{type:String, required:true},
    categoria :{type:String, required:true},
    stock :{type:Number, required:true, default:0},
    ubicacion:{type: String, required:true},
    foto: {data:Buffer, contentType:String}

},{
    timestamps: true
});



module.exports = mongoose.model('Producto', productoSchema);