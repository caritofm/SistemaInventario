const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
    nombreCategoria:{type:String, required:true}

});

module.exports = mongoose.model('Categoria', categoriaSchema);