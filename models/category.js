const slug = require("../utils/slug")

const getCategoriesById = db => async(id) => {
  const category = await db("categories")
                          .select("*")
                          .where('id', id)
  return category
}

const getCategories = db => async () =>{
  const categories = await db("categories").select("*")
  const categoriasWithSlug = categories.map( category => {
    const newCategory = {...category, slug: slug(category.category)}
    return newCategory
  })
  return categoriasWithSlug
}
module.exports = {
  getCategories, getCategoriesById
}