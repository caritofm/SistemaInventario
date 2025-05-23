const express = require('express');
const router = express.Router();
const db = require('../firebase');

router.post('/', async (req,res) =>{
    try{
        const data = req.body;
        const decRef = await db.collection('productos').add(data);
        res.status(201).send({id:decRef.id, mesagge:'Producto agregado'});
    }catch(error){
        res.status(500).send({error:'Error al agregar producto'});
        
    }
});

module.exports = router;