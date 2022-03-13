const express = require('express');
const productsRoutes = require('./routes/products.routes');
const carritosRoutes = require('./routes/carritos.routes');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use('/productos', productsRoutes);
router.use('/carrito', carritosRoutes);

module.exports = router;