const slug = require("../utils/slug")
const Joi = require('@hapi/joi')

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
  const {error, value } = Joi.validate(category, createSchema ,{abortEarly:false, stripUnknown: true})
  if(error){
    console.log(error.details)
    return error
  }else{

    await db('categories').insert(value)
  }
}
module.exports = {
  getCategories, 
  getCategoriesById, 
  createCategory
}