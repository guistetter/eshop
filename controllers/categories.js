const category = require("../models/category")
const product = require("../models/product")

const getCategories = db => async(req, res) =>{
  const products = await product.getProductsByCategoryId(db)(req.params.id)
  const categ = await category.getCategoriesById(db)(req.params.id)
  res.render("category", {
    products,
    category: categ
  })
}

const adminGetCategories = db => async(req,res) => {
  const categories = await category.getCategories(db)()
  res.render('admin/categories/index',{
    categories
  })
}

const adminCreateCategory = db => async(req,res) =>{
  //console.log(req)
  if(req.method === "GET"){
    res.render('admin/categories/create')
  } else {
    await category.createCategory(db)(req.body)
    res.send(req.body)
  }
}

module.exports = {
  getCategories,
  adminGetCategories,
  adminCreateCategory
}