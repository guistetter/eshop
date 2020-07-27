const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const slug = require("./utils/slug")

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

const getProductsByCategoryId = async (id) => {
  const products = await db("products").select("*").where("id", function(){
    this
    .select("categories_products.product_id")
    .from("categories_products")
    .whereRaw("categories_products.product_id = products.id")
    .where("categorie_id", id)
  })
  return products
}

app.get("/", async (req,res) => {
  const categories = await getCategories()
  res.render("home", {
    categories
  })
})

app.get("/categoria/:id/:slug", async(req, res) =>{
  const categories = await getCategories()
  const products = await getProductsByCategoryId(req.params.id)
  const category = await getCategoriesById(req.params.id)
  res.render("category", {
    products,
    categories,
    category
  })
})

app.listen(port, err =>{
  if(err){
    console.log("nao foi possivel iniciar servidor")
  } else {
    console.log("devShop server rodando")
  }
})