const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// 🔧 Función para conectar con fallback automático
const connectDB = async () => {
  // URL de Atlas (mantener para futuro uso)
  const atlasUrl = 'mongodb+srv://carolfloresm:0VBajr2eLL8CacgJ@cluster0.hgmgeel.mongodb.net/inventario?retryWrites=true&w=majority&appName=Cluster0';
  
  // URL local
  const localUrl = 'mongodb://localhost:27017/inventario';
  
  console.log('🔄 Intentando conectar a MongoDB Atlas...');
  
  try {
    // Intenta Atlas primero con timeout corto
    await mongoose.connect(atlasUrl, {
      serverSelectionTimeoutMS: 3000, // Solo 3 segundos
      connectTimeoutMS: 3000,
    });
    console.log('✅ Conectado exitosamente a MongoDB Atlas');
    return 'atlas';
  } catch (atlasError) {
    console.log('⚠️  Atlas no disponible, cambiando a MongoDB local...');
    console.log('📝 Error de Atlas:', atlasError.message);
    
    try {
      // Usar MongoDB local
      await mongoose.connect(localUrl, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log('✅ Conectado exitosamente a MongoDB Local');
      console.log('💡 Datos se guardarán en: mongodb://localhost:27017/inventario');
      return 'local';
    } catch (localError) {
      console.error('❌ Error conectando a MongoDB local:', localError.message);
      console.error('🔧 Pasos para solucionar:');
      console.error('   1. Instala MongoDB: https://www.mongodb.com/try/download/community');
      console.error('   2. Inicia el servicio MongoDB');
      console.error('   3. O ejecuta: mongod');
      process.exit(1);
    }
  }
};

// Conectar a la base de datos antes de configurar rutas
connectDB().then((dbType) => {
  // Configurar rutas solo después de conectar exitosamente
  const productoRoutes = require('./routes/products'); // Asegúrate que el nombre del archivo sea correcto
  app.use('/api/productos', productoRoutes);

  // Ruta de prueba
  app.get('/', (req, res) => {
    res.json({ 
      mensaje: 'Servidor funcionando correctamente',
      database: dbType === 'atlas' ? 'MongoDB Atlas' : 'MongoDB Local',
      endpoints: [
        'GET /api/productos - Obtener productos',
        'POST /api/productos - Crear producto'
      ]
    });
  });

  // Ruta para verificar conexión a DB
  app.get('/health', (req, res) => {
    res.json({
      status: 'OK',
      database: mongoose.connection.readyState === 1 ? 'Conectado' : 'Desconectado',
      dbName: mongoose.connection.name || 'Sin nombre'
    });
  });

  // Iniciar servidor
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log('🚀 Servidor corriendo en http://localhost:3000');
    console.log('📊 Panel de salud: http://localhost:3000/health');
    console.log('📦 API Productos: http://localhost:3000/api/productos');
    console.log('');
    console.log('✨ ¡Listo para recibir peticiones!');
  });

}).catch((error) => {
  console.error('💥 Error fatal al iniciar:', error);
  process.exit(1);
});