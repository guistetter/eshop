const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const category = require("./models/category")
const home = require("./controllers/home")

const categories = require("./routes/categories")
const products = require("./routes/products")

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

app.get("/", home.getIndex)

app.use(categories(db))

app.use(products(db))

app.listen(port, err =>{
  if(err){
    console.log("nao foi possivel iniciar servidor")
  } else {
    console.log("devShop server rodando")
  }
})