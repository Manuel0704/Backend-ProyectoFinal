const express = require('express');
const ctrls = require('../../controllers/product.controllers');

const router = express.Router();

const isAdmin = true;//cambiar a false para restringir el acceso a los routes con el middleware -accesMiddleware-

//middleware function
const accesMiddleware = (req, res, next) => {
    if (!isAdmin) res.status(401).json({ error: -1, description: `ruta ${req.url} metodo ${req.method} no autorizada` });
    else next();
}

router.get('/', ctrls.getProductsController);
router.get('/:id', ctrls.getProductController);
router.post('/', accesMiddleware, ctrls.saveProductController);
router.put('/:id', accesMiddleware, ctrls.updateProductController);
router.delete('/:id', accesMiddleware, ctrls.deleteProductController);

module.exports = router;