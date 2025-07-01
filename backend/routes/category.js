const express = require('express');
const router = express.Router();
const Categoria = require('../models/category.js');
const categoryData = require('../assets/data/category.json');

// Ruta para cargar las categorías desde el JSON al MongoDB
// Route to load categories from JSON to DB
router.post('/categoria/load', async (req, res) => {
  try {
    let insertadas = 0;
    for (const cat of categoryData) {
      const existe = await Categoria.findOne({ nombreCategoria: cat.nombreCategoria });
      if (!existe) {
        await Categoria.create(cat);
        insertadas++;
      }
    }
    res.json({ mensaje: `Categorías cargadas: ${insertadas}` });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al cargar categorías', error });
  }
});

// Route to get categories for frontend
router.get('/', async (req, res) => {
  try {
    const categorias = await Categoria.find({});
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener categorías', error });
  }
});

module.exports = router;
