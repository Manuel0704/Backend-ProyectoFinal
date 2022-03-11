const { CarritoAPI } = require('../models/index');
const Carritos = new CarritoAPI('./data/carritos.json');

const getCartsController = async (req, res) => {
    res.json(await Carritos.getAll());
}
const getCartController = async (req, res) => {
    const { id } = req.params;
    return isNaN(+id) ? res.json({ error: 'El parametro no es numero' }) : res.json(await Carritos.getProductsById(id));
}
const createCartController = async (req, res) => {
    const { products } = req.body;
    const timestamp = Date.now();
    return !products ? res.json({ error: 'datos insuficientes' }) : res.json(await Carritos.saveCart({ products, timestamp }));
}
const putCartProductsController = async (req, res) => {
    const { id } = req.params;
    if (isNaN(+id)) return res.json({ error: 'El parametro no es un numero' });
    const { products } = req.body;
    if (!products) return res.json({ error: 'datos insuficientes' });
    res.json(await Carritos.addProductsToCart(id, products));
}
const deleteCartController = async (req, res) => {
    const { id } = req.params;
    return isNaN(+id) ? res.json({ error: 'El parametro no es un numero' }) : res.json(await Carritos.deleteCart(id));
}
const deleteCartProductsController = async (req, res) => {
    const { id, id_prod } = req.params;
    if (isNaN(+id) || isNaN(+id_prod)) return res.json({ error: 'El parametro no es un numero' });
    res.json(await Carritos.deleteProductInCart(id, id_prod));
}

module.exports = {
    getCartsController,
    getCartController,
    createCartController,
    putCartProductsController,
    deleteCartController,
    deleteCartProductsController,
    Carritos
}