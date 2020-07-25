const express = require("express")
const app = express()
const port = process.env.PORT || 3000

const db = require("knex")({
  client: "mysql2",
  connection: {
    host: '127.0.0.1',
    user: "root",
    password: "123456",
    database: "devShop"
  }
})

app.set("view engine", "ejs")
app.use(express.static("public"))

app.get("/", async (req,res) => {
  const categories = await db("categories").select("*")
res.render("home",{
  categories:categories
})
})

app.listen(port, err =>{
  if(err){
    console.log("nao foi possivel iniciar servidor")
  } else {
    console.log("devShop server rodando")
  }
})