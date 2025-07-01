const mongoose = require('mongoose');
const productoSchema = new mongoose.Schema({
    nombre :{type:String, required:true},
    categoria: {type:String, required:true},
    stock:{type:Number, required:true, default:0},
    ubicacion:{type:String, required:true}
})


module.exports = mongoose.model('Productos', productoSchema);