const init = db => {
  const router = require("express").Router()
  const categories = require("../../controllers/categories")
  
  router.get("/", categories.adminGetCategories(db))
  //router.get('/', (req,res) => res.send('ola'))
  return router
}

module.exports = init