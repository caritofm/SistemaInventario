const Bitacora = require('../models/bitacora');

const registrarEnBitacora = async ({ usuario, accion, producto, detalle }) => {
  try {
    const nuevaEntrada = new Bitacora({
      usuario,
      accion,
      producto,
      detalle
    });

    await nuevaEntrada.save();

    console.log('📌 Bitácora registrada:', nuevaEntrada);
  } catch (error) {
    console.error('❌ Error al registrar en la bitácora:', error.message);
  }
};

module.exports = registrarEnBitacora;
