const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Movimiento = require('../models/movimientosInventario');

router.get('/', async (req, res) => {
    try{
        console.log('🔍 DEBUGGING POPULATE');
        
        // 1. Ver documento raw
        const sinPopulate = await Movimiento.find().limit(1);
        console.log('📄 Sin populate:', JSON.stringify(sinPopulate[0], null, 2));
        
        // 2. VERIFICAR SI EXISTEN LOS DOCUMENTOS
        if(sinPopulate[0]) {
            console.log('🔄 Verificando existencia de documentos...');
            
            // Verificar Usuario
            const usuarioExiste = await mongoose.model('Usuario').findById(sinPopulate[0].usuarioId);
            console.log('👤 Usuario existe:', !!usuarioExiste);
            if(usuarioExiste) {
                console.log('👤 Usuario encontrado:', usuarioExiste.nombre);
            } else {
                console.log('❌ NO se encontró usuario con ID:', sinPopulate[0].usuarioId);
            }
            
            // Verificar Producto
            const productoExiste = await mongoose.model('Producto').findById(sinPopulate[0].productoId);
            console.log('📦 Producto existe:', !!productoExiste);
            if(productoExiste) {
                console.log('📦 Producto encontrado:', productoExiste.nombre);
            } else {
                console.log('❌ NO se encontró producto con ID:', sinPopulate[0].productoId);
            }
        }
        
        // 3. Populate con manejo de errores
        console.log('🔄 Intentando populate...');
        const conPopulate = await Movimiento.find()
            .populate({
                path: 'usuarioId',
                select: 'nombre',
                options: { strictPopulate: false }
            })
            .populate({
                path: 'productoId',
                select: 'nombre',
                options: { strictPopulate: false }  
            })
            .limit(1);
        
        console.log('📄 Con populate:', JSON.stringify(conPopulate[0], null, 2));
        
        // 4. Para la respuesta final
        const movimientos = await Movimiento.find()
            .populate({
                path: 'usuarioId',
                select: 'nombre',
                options: { strictPopulate: false }
            })
            .populate({
                path: 'productoId', 
                select: 'nombre',
                options: { strictPopulate: false }
            });
            
        res.json(movimientos);
    }catch (error){
        console.error('❌ Error:', error);
        res.status(500).json({mensaje: 'Error al obtener movimientos'})
    }
});

//entrada de productos total

router.get('/entrada/total', async (req, res) => {
    try{
        const totalEntrada = await Movimiento.countDocuments({ tipo: "Entrada" });
        res.json({ totalEntrada});
    }catch(error){
        console.log('Error al obtener  total de entradas', error);
        res.status(500).json({mensaje:'Error al obtener el total de entradas'})

    }
});

//salida de productos total 
router.get('/salida/total', async (req, res) => {
    try{
       const salidaTotal = await Movimiento.countDocuments({tipo: "Salida"})
       res.json({salidaTotal});
    }catch(error){
        console.log('Error al obtener  total de Salida', error);
        res.status(500).json({mensaje:'Error al obtener el total de salidas'})

    }
});






router.post('/', async (req, res) => {
  try {

    const{producto_id, tipo, cantidad,usuario_id, fecha, motivo} = req.body
    console.log('🟢 Iniciando POST');
    console.log('Body recibido:', req.body);
    console.log('usuarioId del body:', req.body.usuarioId);
    console.log('Tipo de usuarioId:', typeof req.body.usuarioId);
    
    const nuevo = new Movimiento({
        producto_id: producto_id,
        tipo:tipo,
        cantidad:cantidad,
        usuario_id : usuario_id,
        fecha: fecha,
        motivo:motivo


    })
    console.log('🟢 Objeto creado:', nuevo);
    console.log('usuarioId en el objeto:', nuevo.usuarioId);
    
    // Antes de guardar
    console.log('Antes de guardar - usuarioId:', nuevo.usuarioId);
    
    await nuevo.save();
    console.log('🟢 Guardado exitoso');
    
    // Después de guardar
    console.log('Después de guardar - usuarioId:', nuevo.usuarioId);
    
    res.status(201).json(nuevo);
  } catch (err) {
    console.error('❌ ERROR COMPLETO:', err);
    res.status(500).json({ mensaje: 'Error al guardar movimiento', error: err.message });
  }
});

module.exports = router;

