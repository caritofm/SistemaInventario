const express = require('express');
const router = express.Router();
const proveedorController = require('../controller/proveedores.controler');

// Rutas CRUD
router.post('/', proveedorController.crearProveedor);
router.get('/', proveedorController.obtenerProveedores);
router.get('/:id', proveedorController.obtenerProveedorPorId);
router.put('/:id', proveedorController.actualizarProveedor);
router.delete('/:id', proveedorController.eliminarProveedor);

module.exports = router;


