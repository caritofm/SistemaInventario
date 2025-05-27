const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: {type:String, required:true},
    apellido:{type:String, required:true},
    cargo :{type:String, required:true},
    stock :{type:String, required:true, default:0},
    salario : {type:String, required:true}

});

module.exports = mongoose.model('Usuario', usuarioSchema);