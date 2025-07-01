const express = require('express');
const router = express.Router();
const proveedorController = require('../controller/proveedores.controler');
const { authenticateToken } = require('../middlewares/autenticateToken');
const { authorizeRoles } = require('../middlewares/auth.middleware');
const multer = require('multer');
const upload = multer();

// Rutas CRUD
router.post('/', upload.none(), authenticateToken, authorizeRoles(['admin', 'gestor']), proveedorController.crearProveedor);
router.get('/',authenticateToken, authorizeRoles(['admin', 'gestor']), proveedorController.obtenerProveedores);
router.get('/:id', authenticateToken, authorizeRoles(['admin', 'gestor']), proveedorController.obtenerProveedorPorId);
router.put('/:id', authenticateToken, authorizeRoles(['admin', 'gestor']),proveedorController.actualizarProveedor);
router.delete('/:id',authenticateToken, authorizeRoles(['admin', 'gestor']), proveedorController.eliminarProveedor);

module.exports = router;


