const init = db => {
  const auth = require("../controllers/auth")

  const home = require("../controllers/home")

  const categories = require("./categories")
  const products = require("./products")

  const router = require("express").Router()

  router.post('/login',auth.login(db))
  router.get("/", home.getIndex)
  router.use("/categoria", categories(db))
  router.use("/produto", products(db))
  return router
}
module.exports = init