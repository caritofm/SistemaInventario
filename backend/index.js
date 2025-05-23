const express = require('express');
const app = express();
const productoRoutes = require('./routes/products');

app.use(express.json()); //permite leer JSON desde el body
app.use('/api/productos', productoRoutes);



const PORT =process.env.PORT || 3000;
app.listen(PORT, () =>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})