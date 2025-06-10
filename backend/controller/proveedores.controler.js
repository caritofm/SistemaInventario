const Proveedor = require('../models/proveedores');

exports.crearProveedor = async (req, res) => {
  try {
    // Parsear el contacto que viene como texto JSON
    if (typeof req.body.contacto === 'string') {
      req.body.contacto = JSON.parse(req.body.contacto);
    }
    
    const nuevoProveedor = new Proveedor(req.body);
    console.log('parse', nuevoProveedor)
    console.log('Proveedores', req.body);
    await nuevoProveedor.save();
    res.status(201).json(nuevoProveedor);
    
  } catch (error) {
    console.error('Error guardando proveedor:', error);
    res.status(400).json({ mensaje: 'Error al crear proveedor', error });
  }
};


// Obtener todos los proveedores
exports.obtenerProveedores = async (req, res) => {
  try {
    const proveedores = await Proveedor.find();
    res.json(proveedores);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener proveedores', error });
  }
};

// Obtener un proveedor por ID
exports.obtenerProveedorPorId = async (req, res) => {
  try {
    const proveedor = await Proveedor.findById(req.params.id);
    if (!proveedor) return res.status(404).json({ mensaje: 'Proveedor no encontrado' });
    res.json(proveedor);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener proveedor', error });
  }
};

// Actualizar proveedor
exports.actualizarProveedor = async (req, res) => {
  try {
    const proveedorActualizado = await Proveedor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(proveedorActualizado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar proveedor', error });
  }
};

// Eliminar proveedor
exports.eliminarProveedor = async (req, res) => {
  try {
    await Proveedor.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Proveedor eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar proveedor', error });
  }
};
