const { ProductAPI } = require('../models/index');
const Products = new ProductAPI('./data/productos.json');

const getProductsController = async (req, res) => {
    res.json(await Products.getAll());
}
const getProductController = async (req, res) => {
    const { id } = req.params;
    if (isNaN(+id)) return res.json({ error: 'El parametro debe ser un numero' });
    res.json(await Products.getById(id));
}
const saveProductController = async (req, res) => {
    const { title, description, code, thumbnail, price, stock } = req.body;
    const timestamp = Date.now();
    if (!title || !description || !code || !thumbnail || !price) return res.json({ error: 'datos insuficientes' })
    res.json(await Products.saveProduct({ timestamp, title, description, code, thumbnail, price, stock }));
}
const updateProductController = async (req, res) => {
    const { id } = req.params;
    if (isNaN(+id)) return res.json({ error: '1-El parametro debe ser un numero' });
    const model = ['title', 'description', 'code', 'thumbnail', 'price'];//el modelos de las propiedades de un producto
    const newData = {}; //data que pasaremos como parametro al updateProduct
    let existData = false;
    for (const r_key in req.body)//aqui verificaremos si hay propiedades en el req.body para actualizar al producto
        if (model.some(key => key === r_key))//si algun modelo es igual a la propiedad del req.body lo pasamos a newData
            {
                newData[r_key] = req.body[r_key];
                existData = true;//establecemos que existe al menos un dato para actualizar al producto
            }
    if (!existData) return res.json({ error: 'se requiere al menos un dato' });
    res.json(await Products.updateProduct(newData, id));
}
const deleteProductController = async (req, res) => {
    const { id } = req.params;
    if (isNaN(+id)) return res.json({ error: 'El parametro debe ser un numero' });
    res.json(await Products.deleteProduct(id));
}

module.exports = {
    getProductsController,
    getProductController,
    saveProductController,
    updateProductController,
    deleteProductController,
    Products
}