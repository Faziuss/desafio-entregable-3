import express from 'express'
import ProductManager from './ProductManager.js';

const app = express();
const productManager = new ProductManager();

app.use(express.urlencoded({extended:true}))

app.set("PORT", 8080)

app.get("/products", async (req, res)=>{
    await productManager.loadProducts();

    const limit = req.query.limit;
    let products = productManager.getProducts();
  
    if (limit) {
      products = products.slice(0, parseInt(limit, 10));
    }  

    res.json({ products });
    
})

export default app