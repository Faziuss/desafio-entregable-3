import express from 'express'
import ProductManager from './ProductManager.js';

const app = express();
const productManager = new ProductManager();

app.use(express.urlencoded({extended:true}))

app.set("PORT", 8080)

app.get("/products", async (req, res)=>{
    await productManager.loadProducts();

    const limit = req.query.limit;
    const products = productManager.getProducts();
  
    if (limit) {
      products = products.slice(0, parseInt(limit, 10));
    }  

    res.json({ products });
})

app.get("/products/:pid", async(req,res)=>{
  await productManager.loadProducts();
  const {pid} = req.params
  const products = productManager.getProducts();
  const filteredProduct = products.filter(p => p.id == pid)
  res.send({filteredProduct})
})

export default app