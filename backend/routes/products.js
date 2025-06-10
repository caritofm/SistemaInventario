const express = require('express');
const router = express.Router();
const Producto = require('../models/producto');
const Categoria = require('../models/category');  // IMPORTANTE: importar modelo Categoria

// Multer configuración
const multer = require('multer');
const path = require('path');
const producto = require('../models/producto');
// 1. Configuración de Multer directamente aquí
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Carpeta donde guardar las imágenes
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname)); // nombre-único.jpg
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const isValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  if (isValid) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten imágenes'), false);
  }
};

const upload = multer({ storage, fileFilter });
// RUTA: Obtener productos por nombre de categoría
router.get('/', async (req, res) => {
  try {
    const productos = await Producto.find()
      .populate('categoria', 'nombreCategoria')
      .populate('ubicacion', 'nombreUbicacion');

    const alertas = [];

    productos.forEach(p => {
      if (p.stock <= p.stockmin) {
        alertas.push({ tipo: 'stock_bajo', mensaje: `Stock bajo ${p.nombre}` });
      }
    });

    // ✅ Enviar respuesta una sola vez
    res.json({ productos, alertas });
  } catch (error) {
    console.error('❌ Error al obtener productos:', error);
    res.status(500).json({ mensaje: 'Error al obtener productos' });
  }
});

//ruta para contar el total de productos 

router.get('/total', async (req, res) => {
  try {
    const total = await Producto.countDocuments();
    res.json({ total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al contar productos' });
  }
});

//stock total 
router.get('/stock-total', async (req, res) => {
  try {
    const resultado = await Producto.aggregate([
      {
        $group: {
          _id: null,
          totalStock: { $sum: "$stock" }
        }
      }
    ]);

    const total = resultado[0]?.totalStock || 0;
    res.json({ totalStock: total });
  } catch (error) {
    console.error('❌ Error al calcular el stock total:', error);
    res.status(500).json({ error: 'Error al obtener stock total' });
  }
});




// Otras rutas (GET por id, POST, DELETE, PUT)

router.get('/:id', async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id).populate('categoria', 'nombreCategoria');
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



router.post('/', upload.single('foto'), async (req, res) => {
  try {
    const { categoria, codigo, nombre, stock, ubicacion } = req.body;
    const foto = req.file ? req.file.filename : null;

    console.log('=== DEBUG FORM ===');
    console.log('req.body:', req.body);
    console.log('req.file:', req.file);
    console.log('Categoria recibida:', categoria);

    if (!categoria || !codigo || !nombre || !stock || !ubicacion) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios.' });
    }

    // Validar que la categoría exista
    const categoriaExiste = await Categoria.findById(categoria);
    if (!categoriaExiste) {
      return res.status(400).json({ mensaje: 'La categoría especificada no existe.' });
    }

    const nuevoProducto = new Producto({
      categoria: categoriaExiste._id, // Guardar como referencia
      codigo,
      nombre,
      stock: parseInt(stock),
      ubicacion,
      foto
    });

    await nuevoProducto.save();

    // Devolver producto con populate de la categoría
    const productoConCategoria = await Producto.findById(nuevoProducto._id).populate('categoria');

    res.status(201).json(productoConCategoria);

  } catch (error) {
    console.error('Error al guardar producto:', error.message);
    res.status(500).json({ mensaje: 'Error al guardar producto', error: error.message });
  }
});

// DELETE /api/productos/:id
router.delete('/:id', async (req, res) => {
  try {
    const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
    
    if (!productoEliminado) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('❌ Error al eliminar producto:', error.message);
    res.status(500).json({ mensaje: 'Error al eliminar producto', error: error.message });
  }
});






router.put('/:id', async (req, res) => {
  try {
    const productoActualizado = await Producto.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    ).populate('categoria', 'nombreCategoria'); // ← Agrega esto
    
    if (!productoActualizado) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.json(productoActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error actualizando producto', error });
  }
});

module.exports = router;
