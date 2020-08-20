const init = db => {
  const router = require("express").Router()

  const categories = require("./categories")
  //const products = require("./products")

  //autorizacao para admin baseado em papel
  router.use((req,res,next) => {
    if(req.session.user){
      if(req.session.user.roles.indexOf('admin') < 0){
        res.redirect('/')
      } else {
        next()
      }
    } else{
      res.redirect('/login')
    }
  })
  
  router.get('/',(req,res) => res.render('admin/index'))
  router.use("/categorias", categories(db))
  //router.use("/produto", products(db))
  return router
}
module.exports = init