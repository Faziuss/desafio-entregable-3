import fs from 'fs/promises';

class ProductManager {
  constructor() {
    this.path = "./products.json";
    this.products = []
    this.loadProducts();
  }

  async loadProducts() {
    try {
      const data = await fs.readFile(this.path, "utf8");
      this.products = JSON.parse(data);
    } catch (error) {
      this.products = [];
    }
  }

  async saveProducts() {
    const data = JSON.stringify(this.products, null, 2);
    await fs.writeFile(this.path, data);
  }

  async addProduct(product) {
    product.id = this.products.length + 1;
    this.products.push(product);
    await this.saveProducts();
  }

  getProducts() {
    return this.products;
  }

  async getProductById(id) {
      const foundProduct = this.products.find((product) => product.id === id);
      return foundProduct;
  }

  async updateProduct(id, upFields) {
    const i = this.products.findIndex((product) => product.id === id);
    if (i !== -1) {
      this.products[i] = { ...this.products[i], ...upFields };
      await this.saveProducts();
    }
  }

  async deleteProduct(id) {
    try {
      const i = this.products.findIndex((product) => product.id === id);
      if (i !== -1) {
        this.products.splice(i, 1);
        await this.saveProducts();
      } else {
        throw new Error("Producto no encontrado");
      }
    } catch (error) {
      throw error;
    }
  }
}

export default ProductManager;
