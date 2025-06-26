const mongoose = require('mongoose');

const ubicacionSchema = new mongoose.Schema({
    nombreUbicacion:{type:String, required:true},
    descripcion:{type:String, required:true},
    categoria:{type: mongoose.Schema.Types.ObjectId, ref:'Categoria'}

});

module.exports = mongoose.model('Ubicacion', ubicacionSchema);