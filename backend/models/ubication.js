const mongoose = require('mongoose');

const ubicacionSchema = new mongoose.Schema({
    nombreUbicacion:{type:String, required:true},
    descripcion:{type:String, required:true}

});

module.exports = mongoose.model('Ubicacion', ubicacionSchema);