const express = require('express');
const ctrls = require('../../controllers/carrito.controllers');

const router = express.Router();

router.get('/', ctrls.getCartsController);
router.get('/:id/productos', ctrls.getCartController);
router.post('/', ctrls.createCartController);
router.post('/:id/productos', ctrls.putCartProductsController);
router.delete('/:id', ctrls.deleteCartController);
router.delete('/:id/productos/:id_prod', ctrls.deleteCartProductsController);

module.exports = router;