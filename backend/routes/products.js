const express = require('express');
const router = express.Router();
const Producto = require('../models/producto.js');

// Config de multer 
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/') // Cambiado a 'uploads/' para coincidir con tu servidor
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({storage: storage});

// GET - Obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch(error) {
        res.status(500).json({mensaje: 'Error al obtener productos'});
    }
});

// POST - Crear producto (CORREGIDO: ruta '/' en lugar de '/productos')
router.post('/', upload.single('foto'), async (req, res) => {
    try {
        const { categoria, codigo, nombre, stock, ubicacion } = req.body;
        const foto = req.file ? req.file.filename : null;

        const nuevoProducto = new Producto({
            categoria,
            codigo,
            nombre,
            stock,
            ubicacion,
            foto
        });

        await nuevoProducto.save();
        res.json(nuevoProducto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al guardar el producto' });
    }
});

router.delete('/:id', async (req, res) =>{
    try{
        const productoEliminado = await Producto.findByIdAndDelete(req.params.id)
        if(!productoEliminado){
            return res.status(404).json({mensaje: 'Producto no encontrado'})
        }
        res.json({mensaje: 'Producto Eliminado Correctamente'});
    }catch(error){
        console.error(error);
        res.status(500).json({mensaje: 'Error al eliminar el producto'});

    }
})

module.exports = router;