const init = db =>{
  const product = require("../models/product")(db)

  const getProducts = async(req,res) => {
    const prod = await product.getProductById(req.params.id)
    res.render("product-detail", {
      product:prod
    
    })
  }
  return {getProducts}
}
module.exports = init