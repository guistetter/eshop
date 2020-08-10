
const init = db => {const category = require("./models/category")
const routes = require("./routes")

const express = require("express")
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded())

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
  app.use(routes(db))
  return app
}
module.exports = init