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
    const timestamp = Date.now();
    return res.json(await Carritos.saveCart({ productos: [], timestamp }));
}
const putCartProductsController = async (req, res) => {
    const { id } = req.params;
    if (isNaN(+id)) return res.json({ error: 'El parametro no es un numero' });
    if (Object.keys(req.query).length != 2)
        return res.json({ error: 'se requiere de 2 parametros en la URL para añadir productos' })
    const { id_prod, quantity } = req.query;
    if (isNaN(+id_prod) || isNaN(+quantity)) return res.json({ error: 'los parametros deben ser numeros' });
    res.json(await Carritos.addProductsToCart(id, id_prod, quantity));
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