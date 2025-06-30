const Bitacora = require('../models/bitacora');

const registrarEnBitacora = async ({ usuario, accion,solicitud, producto, detalle }) => {
  try {
    const nuevaEntrada = new Bitacora({
      usuario,
      accion,
      solicitud,
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
