const express = require('express');
const router = express.Router();

const Usuario = require('../models/usuarios');


router.get('/', async (req,res) =>{
    try{
        const usuarios = await Usuario.find();
        res.json(usuarios)
    }catch(error){
        res.status(500).json({mensaje: 'Error al obtener productos'})
    }
})

router.post('/', async (req, res ) => {
    console.log('REQ BODY', req.body)
    res.send('OK');
    try{
        const nuevoUsuarios = new Usuario({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            cargo: req.body.cargo,
            salario: req.body.salario
            
        });
        await nuevoUsuario.save();
        res.status(201).json(nuevoUsuario);
    }catch(error){
        res.status(400).json({mensaje:'Error al crear producto',error})
    }
    
})




module.exports = router;