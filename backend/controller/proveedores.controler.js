const Proveedor = require('../models/proveedores');

exports.crearProveedor = async (req, res) => {
  try {
    const proveedorData = {
      nombre: req.body.nombre,
      rut: req.body.rut,
      direccion: req.body.direccion,
      contacto: {
        nombre: req.body.contactoNombre,
        email: req.body.contactoEmail,
        telefono: req.body.contactoTelefono,
      },
      terminosPago: req.body.terminosPago,
    };

    const nuevoProveedor = new Proveedor(proveedorData);
    console.log('Proveedor a guardar:', nuevoProveedor);
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
