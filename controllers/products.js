const category = require("../models/category")
const product = require("../models/product")

const getProducts = db => async(req,res) => {
  const prod = await product.getProductById(db)(req.params.id)
  res.render("product-detail", {
    product:prod
  
  })
}
module.exports = {
  getProducts
}