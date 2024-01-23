import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();
const productManager = new ProductManager();

app.use(express.urlencoded({ extended: true }));

app.set("PORT", 8080);

app.get("/products", async (req, res) => {
  try {
    await productManager.loadProducts();

    const limit = req.query.limit;
    let products = productManager.getProducts();

    if (limit) {
      products = products.slice(0, parseInt(limit, 10));
    }

    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    await productManager.loadProducts();
    const pid = parseInt(req.params.pid, 10); //uso parseInt para que en la comparación no me tire ningun error
    const product = await productManager.getProductById(pid);

    if (!product)
      return res.status(404).json({ message: "Producto no encontrado." });

    return res.status(200).json({ products: product });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default app;
