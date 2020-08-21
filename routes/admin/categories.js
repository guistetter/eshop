const init = db => {
  const router = require("express").Router()
  const categories = require("../../controllers/categories")
  
  router.get("/", categories.adminGetCategories(db))
  //router.get('/', (req,res) => res.send('ola'))

  router.get('/nova', categories.adminCreateCategory(db))
  router.post('/nova', categories.adminCreateCategory(db))

  router.get('/excluir/:id', categories.adminRemoveCategory(db))
  router.get('/editar/:id', categories.adminUpdateCategory(db))
  router.post('/editar/:id', categories.adminUpdateCategory(db))
  return router
}

module.exports = init