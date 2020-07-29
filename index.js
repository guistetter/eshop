const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const category = require("./models/category")
const product = require("./models/product")

const db = require("knex")({
  client: "mysql2",
  connection: {
    host: '127.0.0.1',
    user: "root",
    password: "123456",
    database: "devShop"
  }
})

db.on("query", query => {
  console.log("SQL debug:", query.sql)
})

app.set("view engine", "ejs")
app.use(express.static("public"))

//middleware para adicionar categoria ao menu
app.use(async (req, res, next) => {
  const categories = await category.getCategories(db)()
  res.locals = {
    categories
  }
  next()
})

app.get("/", async (req,res) => {
  res.render("home")
})

app.get("/categoria/:id/:slug", async(req, res) =>{
  const products = await product.getProductsByCategoryId(db)(req.params.id)
  const categ = await category.getCategoriesById(db)(req.params.id)
  res.render("category", {
    products,
    category: categ
  })
})

app.get("/produto/:id/:slug", async(req,res) => {
  const prod = await product.getProductById(db)(req.params.id)
  res.render("product-detail", {
    product:prod
  
  })
})
app.listen(port, err =>{
  if(err){
    console.log("nao foi possivel iniciar servidor")
  } else {
    console.log("devShop server rodando")
  }
})