const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuarios.js')
const authController = require('../controller/auth.controller.js')

const fs = require('fs');
const path = require('path');


router.get('/usuario/:id', authController.getUsuarioById);
router.post('/login',authController.login);




module.exports = router;