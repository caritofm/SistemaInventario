const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: {type:String, required:true},
    correoElec: {type:String, required:true},
    contraseña: {type:String, required:true},
    rol :{type:String, enum: ['admin', 'gestor'], required:true},
    salario : {type:String, required:true}

});

usuarioSchema.pre('save', function (next){
    if(!this.isModified('contraseña')) return next();
    this.contraseña = bcrypt.hashSync(this.contraseña, 8);
    next()
});

usuarioSchema.methods.validarPassword = function (contraseña){
    return bcrypt.compareSync(contraseña, this.contraseña)
}
module.exports = mongoose.model('Usuario', usuarioSchema);