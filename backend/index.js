const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Usuario = require('./models/usuarios'); // Asegúrate de que esta ruta esté correcta

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB
mongoose.connect('mongodb+srv://carolfloresm:0VBajr2eLL8CacgJ@cluster0.hgmgeel.mongodb.net/inventario?retryWrites=true&w=majority&appName=Cluster0',{
  useNewUrlParser:true,
  useUnifiedTopology:true
})
  .then(async () => {
    console.log('✅ Conectado a MongoDB Atlas');

    // Verificar si usuarios ya existen antes de insertar
    const existingUsers = await Usuario.find();
    if (existingUsers.length === 0) {
      const dataPath = path.join(__dirname, './assets/data/user.json');
      const usuarios = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      await Usuario.insertMany(usuarios);
      console.log(' Usuarios insertados desde JSON');
    } else {
      console.log('ℹUsuarios ya existen en la base de datos. No se insertaron.');
    }

    // Rutas
    app.use('/api/auth', require('./routes/usuarios'));
    app.use('/api/categoria', require('./routes/category'));
    app.use('/api/movimientos', require('./routes/movimientos'));
    app.use('/api/productos', require('./routes/products'));
    app.use('/api/ubicacion', require('./routes/ubication'));
    app.use('/api/proveedores', require('./routes/proveedores'));
    app.use('/api/solicitud', require('./routes/solicitudes'));
    app.use('/api/notificaciones', require('./routes/notificacions'));

    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

    // Iniciar servidor
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
    });

  })
  .catch(err => {
    console.error('❌ Error conectando a MongoDB Atlas:', err.message);
  });


