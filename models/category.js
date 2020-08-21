const slug = require("../utils/slug")
const Joi = require('@hapi/joi')
const validation = require("../utils/validation")
//validar dados
const createSchema = Joi.object().keys({
  category: Joi.string().min(5).max(245).required(),
  description: Joi.string().min(5).required()
})

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

const createCategory = db => async(category) => {
    const value = validation.validate(category, createSchema)
    await db('categories').insert(value)
    return true
}

module.exports = {
  getCategories, 
  getCategoriesById, 
  createCategory
}