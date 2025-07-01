const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarios'); // Para usar MongoDB en lugar de JSON

const dataPath = path.join(__dirname, '../assets/data/user.json');

// Función de login existente
exports.login = (req, res) => {
  const { correoElec, contraseña } = req.body;

  try {
    const rawData = fs.readFileSync(dataPath, 'utf8');
    const usuarios = JSON.parse(rawData);

    const usuario = usuarios.find(u =>
      u.correoElec === correoElec && u.contraseña === contraseña
    );

    if (!usuario) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }
    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol, nombre: usuario.nombre },
      'secreto123',
      { expiresIn: '2h' }
    );

    res.json({
      mensaje: 'Login exitoso',
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        rol: usuario.rol
      }
    });
  } catch (error) {
    console.error('Error al leer user.json:', error.message);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// ✅ Función faltante: obtener usuario por ID
exports.getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;

    // Opción 1: Buscar en MongoDB
    const usuario = await Usuario.findById(id).select('-contraseña'); // Excluir contraseña
    
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json(usuario);


  } catch (error) {
    console.error('Error al obtener usuario:', error.message);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// ✅ Función adicional: obtener todos los usuarios (opcional)
exports.getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select('-contraseña');
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error.message);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};
