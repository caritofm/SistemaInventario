// services/bitacoraLogger.js
const Bitacora = require('../models/bitacora');

const registrarEnBitacora = async ({ usuario, accion, producto = null, detalle = '' }) => {
  try {
    const nuevoRegistro = new Bitacora({
      usuario,
      accion,
      producto,
      detalle
    });

    await nuevoRegistro.save();
    console.log(`📘 Bitácora: ${accion} por ${usuario}`);
  } catch (error) {
    console.error('❌ Error al registrar en la bitácora:', error.message);
  }
};

module.exports = registrarEnBitacora;
