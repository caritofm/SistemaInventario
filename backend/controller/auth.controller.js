const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../assets/data/user.json');

exports.getUsuarioById = (req, res) => {
  const id = req.params.id;

  try {
    const usuarios = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    // Buscar por id como string o como número
    const usuario = usuarios.find(u => u.id == id || u.id === parseInt(id));

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    
    res.json(usuario);

  } catch (error) {
    console.error('Error al leer usuarios:', error);
    res.status(500).json({ mensaje: 'Error leyendo usuarios' });
  }
};
exports.login = (req, res) => {
  const { correoElec, contraseña } = req.body;

  const dataPath = path.join(__dirname, '../assets/data/user.json');

  try {
    const rawData = fs.readFileSync(dataPath, 'utf8');
    const usuarios = JSON.parse(rawData);

    if (!Array.isArray(usuarios)) {
      throw new Error('El JSON no contiene un arreglo');
    }

    const usuario = usuarios.find(u =>
      u.correoElec === correoElec && u.contraseña === contraseña
    );

    if (!usuario) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    res.json({
      mensaje: 'Login exitoso',
      usuario: {
        _id: usuario._id,        // ← AGREGAR ESTA LÍNEA
        nombre: usuario.nombre,
        correo: usuario.correoElec,
        rol: usuario.rol
      }
    });
  } catch (error) {
    console.error('Error al leer el archivo user.json:', error.message);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};