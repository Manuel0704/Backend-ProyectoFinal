const { promises: fs } = require('fs');

class CarritoAPI {
    constructor(path) {
        this.path = path;
    }
    getCartById = async id => {
        const carritos = await this.getAll();
        const foundCart = carritos.find(c => c.id == id);
        return !foundCart ? { error: 'Carrito no encontrado' } : foundCart;
    }
    getProductsById = async id => {
        const carritos = await this.getAll();
        const foundCart = carritos.find(c => c.id == id);
        return !foundCart ? { error: 'Carrito no encontrado' } : foundCart.products;
    }
    getAll = async () => {
        try {
            const carritos = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(carritos);
        } catch (error) { return [] }
    }
    saveCart = async cart => {
        const carritos = await this.getAll();
        let newId = carritos.length <= 0 ? 1 : carritos[carritos.length - 1].id + 1;
        carritos.push({ id: newId, ...cart });
        try {
            await fs.writeFile(this.path, JSON.stringify(carritos, null, 4));
            return { id: newId, ...cart };
        } catch (error) { throw new Error('error al crear carrito') }
    }
    addProductsToCart = async (id, products) => {
        const carritos = await this.getAll();
        const foundIndex = carritos.findIndex(c => c.id == id);
        if (!carritos[foundIndex]) return { error: 'carrito inexistente' };
        carritos[foundIndex].products = products;
        try {
            await fs.writeFile(this.path, JSON.stringify(carritos, null, 4));
            return carritos[foundIndex];
        } catch (error) { throw new Error('no se pudo guardar los productos en el carrito') }
    }
    deleteCart = async id => {
        const carritos = await this.getAll();
        const indexCart = carritos.findIndex(c => c.id == id);
        if (!carritos[indexCart]) return { error: 'Carrito inexistente' }
        const deletedCart = carritos.splice(indexCart, 1);
        try {
            await fs.writeFile(this.path, JSON.stringify(carritos, null, 4));
            return deletedCart;
        } catch (error) { throw new Error('no se pudo borrar el carrito') }
    }
    deleteProductInCart = async (id, id_prod) => {
        const carritos = await this.getAll();
        const indexCart = carritos.findIndex(c => c.id == id);
        if (!carritos[indexCart]) return { error: 'Carrito inexistente' };
        const indexProduct = carritos[indexCart].products.findIndex(p => p.id == id_prod);
        if (!carritos[indexCart].products[indexProduct]) return { error: 'Producto inexistente en carrito' };
        const deletedProduct = carritos[indexCart].products.splice(indexProduct, 1);
        try {
            await fs.writeFile(this.path, JSON.stringify(carritos, null, 4));
            return deletedProduct;
        } catch (error) { throw new Error('no se pudo borrar el producto en el carrito') }
    }
    deleteAll = async () => {
        try {
            await fs.writeFile(this.path, '[]');
        } catch (error) { throw new Error('no se pudo borrar los carritos') }
    }
}

module.exports = CarritoAPI;