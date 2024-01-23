import express from 'express'

const app = express();

app.use(express.urlencoded({extended:true}))

app.set("PORT", 8080)

export default app