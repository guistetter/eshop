const getCategoriesById = async(id) => {
  const category = await db("categories")
                          .select("*")
                          .where('id', id)
  return category
}

const getCategories = async () =>{
  const categories = await db("categories").select("*")
  const categoriasWithSlug = categories.map( category => {
    const newCategory = {...category, slug: slug(category.category)}
    return newCategory
  })
  return categoriasWithSlug
}
