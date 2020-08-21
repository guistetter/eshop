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
  //se nao conseguir inserir a exception é passada pro controller e tratamos lá
    const value = validation.validate(category, createSchema)
    await db('categories').insert(value)
    return true
}

const removeCategory = db => async(id) =>{
  await db('categories').where({id}).del()
}

const updateCategory = db => async(id, category) => {
  //se nao conseguir inserir a exception é passada pro controller e tratamos lá
    const value = validation.validate(category, createSchema)
    await db('categories').where({id}).update(value)
    return true
}

module.exports = {
  getCategories, 
  getCategoriesById, 
  createCategory,
  removeCategory,
  updateCategory
}