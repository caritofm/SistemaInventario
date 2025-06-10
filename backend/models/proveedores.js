const mongoose = require('mongoose');

const proveedoresSchema = new mongoose.Schema({
    nombre: {type:String, required:true},
    rut:{type:String, required:true},
    direccion: {type:String, required:true},
    contacto:{
        nombre:{type:String, required:true},
        email:{type:String, required:true},
        telefono:{type:String, required:true}
    },
    terminosPago:{type:String, enum:['Contado', '30 dias a credito', 'Debito'], required:true}
    
});

module.exports = mongoose.model('Proveedores', proveedoresSchema);