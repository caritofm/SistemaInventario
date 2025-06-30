const express = require('express');
const router = express.Router();
const Producto = require('../models/producto');
const Categoria = require('../models/category');

// Multer configuración
const multer = require('multer');
const path = require('path');

// ✅ CORREGIDO: Asegúrate de que el nombre del archivo coincida
const { authenticateToken } = require('../middlewares/autenticateToken');
const { authorizeRoles } = require('../middlewares/auth.middleware');
const registrarEnBitacora = require('../services/bitacoralogger');

// Configuración de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
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
// En tu servicio backend

// RUTA: Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await Producto.find()
      .populate('categoria', 'nombreCategoria')
      .populate('ubicacion', 'nombreUbicacion');

    const alertas = [];
    const hoy = new Date();
    const proximamente = new Date();
    proximamente.setDate(hoy.getDate() + 30);

    productos.forEach(p => {
      if (typeof p.stock === 'number' && typeof p.stockmin === 'number' && p.stock <= p.stockmin) {
        alertas.push({ tipo: 'stock_bajo', mensaje: `Stock bajo: ${p.nombre}` });
      }

      if (p.fechaVencimiento && !isNaN(Date.parse(p.fechaVencimiento))) {
        const vencimiento = new Date(p.fechaVencimiento);
        if (vencimiento <= proximamente) {
          alertas.push({ tipo: 'vencimiento_proximo', mensaje: `¡${p.nombre} vence pronto!` });
        }
      }
    });

    res.json({ productos, alertas });
  } catch (error) {
    console.error('❌ Error al obtener productos:', error.message);
    res.status(500).json({ mensaje: 'Error al obtener productos', error: error.message });
  }
});








// GET /productos/categoria/:id
router.get('/categoria/:id',authenticateToken,              
  authorizeRoles(['admin','gestor']), async (req, res) => {
  try {
    const productos = await Producto.find({ categoria: req.params.id })
  .populate('categoria', 'nombreCategoria')
  .populate('ubicacion', 'nombreUbicacion'); // ✅ Agrega esto


    res.json(productos);
  } catch (error) {
    console.error('❌ Error al buscar productos por categoría:', error.message);
    res.status(500).json({ mensaje: 'Error buscando productos', error: error.message });
  }
});


// Ruta para contar el total de productos 
router.get('/total', async (req, res) => {
  try {
    const total = await Producto.countDocuments();
    res.json({ total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al contar productos' });
  }
});

// Stock total 
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

// Obtener producto por ID
router.get('/:id', async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id).populate('categoria', 'nombreCategoria');
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear nuevo producto
router.post('/',
  authenticateToken,              
  authorizeRoles(['admin','gestor']),      
  upload.single('foto'),           
  async (req, res) => {
    try {
      const { categoria, codigo, nombre, stock, ubicacion } = req.body;
      const foto = req.file ? req.file.filename : null;

      console.log('=== DEBUG FORM ===');
      console.log('req.body:', req.body);
      console.log('req.file:', req.file);
      console.log('Categoria recibida:', categoria);

      // Validación de campos obligatorios
      if (!categoria || !codigo || !nombre || !stock || !ubicacion) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios.' });
      }

      // Verificar que la categoría existe
      const categoriaExiste = await Categoria.findById(categoria);
      if (!categoriaExiste) {
        return res.status(400).json({ mensaje: 'La categoría especificada no existe.' });
      }

      // Calcular fecha de vencimiento automática según la categoría
      let fechaVencimiento = null;
      const nombreCategoria = categoriaExiste.nombreCategoria?.trim().toLowerCase();
      
      console.log('Nombre de categoría original:', categoriaExiste.nombreCategoria);
      console.log('Nombre de categoría procesado:', nombreCategoria);
      console.log('Comparación con lubricantes:', nombreCategoria === 'lubricantes');
      
      // Usar includes() para ser más flexible con la comparación
      if (nombreCategoria.includes('lubricante')) {
        const hoy = new Date();
        hoy.setMonth(hoy.getMonth() + 3); // Vencimiento en 3 meses
        fechaVencimiento = hoy;
        console.log('✅ Fecha de vencimiento calculada para lubricantes:', fechaVencimiento);
      }else {
        console.log('❌ No se encontró coincidencia para la categoría:', nombreCategoria);
      }
      
      console.log('Fecha de vencimiento final:', fechaVencimiento);

      // Crear el nuevo producto
      const nuevoProducto = new Producto({
        categoria: categoriaExiste._id,
        codigo,
        nombre,
        stock: parseInt(stock), 
        ubicacion,
        fechaVencimiento, // Esto debería guardarse correctamente ahora
        foto
      });

      console.log('Producto antes de guardar:', nuevoProducto);

      // Guardar el producto (SIN la 'w' extra)
      await nuevoProducto.save();

      // Registrar en bitácora
      await registrarEnBitacora({
        usuario: req.user.nombre,
        accion: 'Se creo producto',
        producto: nuevoProducto._id,
        detalle: `Producto creado: ${nombre}, código: ${codigo}`
      });

      // Obtener el producto completo con las relaciones pobladas
      const productoConCategoria = await Producto.findById(nuevoProducto._id)
        .populate('categoria')
        .populate('ubicacion');

      console.log('Producto guardado exitosamente:', productoConCategoria);
      
      res.status(201).json(productoConCategoria);

    } catch (error) {
      console.error('❌ Error al guardar producto:', error.message);
      console.error('Stack trace:', error.stack);
      res.status(500).json({ mensaje: 'Error al guardar producto', error: error.message });
    }
  }
);

// Actualizar producto
router.put('/:id', 
  authenticateToken,
  authorizeRoles(['admin','gestor']),
  async (req, res) => {
    try {
      const productoActualizado = await Producto.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      ).populate('categoria', 'nombreCategoria')
       .populate('ubicacion', 'nombreUbicacion');
      
      if (!productoActualizado) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' });
      }

      await registrarEnBitacora({
        usuario: req.user.nombre,
        accion: 'Modificar producto',
        producto: productoActualizado._id,
        detalle: `Producto actualizado: ${productoActualizado.nombre}, código: ${productoActualizado.codigo}`
      });

      
      res.json(productoActualizado);
    } catch (error) {
      console.error('❌ Error al actualizar producto:', error);
      res.status(500).json({ mensaje: 'Error actualizando producto', error: error.message });
    }
  }
);

router.delete('/:id', 
  authenticateToken,
  authorizeRoles(['admin', 'gestor']),
  async (req, res) => {
    try {
      const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
      
      if (!productoEliminado) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' });
      }

      try{
        console.log('🔍 Registrando en bitácora...');
        await registrarEnBitacora({
          usuario: req.user?.nombre || 'Desconocido',
          accion: 'Eliminar Producto',
          producto: productoEliminado._id,
          detalle: `Producto eliminado: ${productoEliminado.nombre}, código: ${productoEliminado.codigo}`
        });
        console.log('Bitacora registrada')

      }catch(err){

        console.error('❌ Error al registrar bitácora:', err.message);

      }



      res.json({ mensaje: 'Producto eliminado correctamente' });
    } catch (error) {
      console.error('❌ Error al eliminar producto:', error.message);
      res.status(500).json({ mensaje: 'Error al eliminar producto', error: error.message });
    }
  }
);


module.exports = router;
