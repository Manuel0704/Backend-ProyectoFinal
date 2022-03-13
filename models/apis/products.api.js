const { promises: fs } = require('fs');

class ProductAPI {
    constructor(path) {
        this.path = path;
    }
    getById = async id => {
        const products = await this.getAll();
        const foundProduct = products.find(p => p.id == id);
        return !foundProduct ? { error: 'Producto no encontrado' } : foundProduct;
    }
    getAll = async () => {
        try {
            const products = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(products);
        } catch (error) { return [] }
    }
    saveProduct = async product => {
        const products = await this.getAll();
        const newId = products.length <= 0 ? 1 : products[products.length - 1].id + 1;
        products.push({ id: newId, ...product });
        try {
            await fs.writeFile(this.path, JSON.stringify(products, null, 4));
            return { productID: newId };
        } catch (error) { throw new Error(error) }
    }
    updateProduct = async (newProduct, id) => {
        const products = await this.getAll();
        const indexProduct = products.findIndex(p => p.id == id);
        if (!products[indexProduct]) return { error: 'Producto inexistente' };
        Object.assign(products[indexProduct], newProduct);
        try {
            await fs.writeFile(this.path, JSON.stringify(products, null, 4));
            return products[indexProduct];
        } catch (error) { throw new Error('error al actualizar producto') }
    }
    deleteProduct = async id => {
        const products = await this.getAll();
        const indexProduct = products.findIndex(p => p.id == id);
        if (!products[indexProduct]) return { error: `producto ${id} no encontrado` }
        const deletedProduct = products.splice(indexProduct, 1);
        try {
            await fs.writeFile(this.path, JSON.stringify(products, null, 4));
            return deletedProduct;
        } catch (error) { throw new Error('error al eliminar producto') }
    }
    deleteAll = async () => {
        try {
            await fs.writeFile(this.path, '[]');
        } catch (error) {
            throw new Error('error al eliminar los productos');
        }
    }
}

module.exports = ProductAPI;