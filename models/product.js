const init = db => {
  
  const getPaginationParams = query => {
    const {currentPage, pages, pageSize} = query
    return {
      currentPage: currentPage ? parseInt(currentPage) : 0,
      pages: pages ? parseInt(pages) : 1,
      pageSize: pageSize ? parseInt(pageSize) : 10
    }
  }

  const getProductsByCategoryId = async (id, query) => {
    const pagination = getPaginationParams(query)
    console.log(pagination)
    //console.log(currentPage, pages, pageSize)
    const products = await db("products").select("*").whereIn("id", function(){
      this
      .select("categories_products.product_id")
      .from("categories_products")
      .where("categorie_id", id)
    }).offset(pagination.currentPage * pagination.pageSize).limit(pagination.pageSize)
    return products
  }

  // const getProductsByCategoryId = async (id) => {
  //   const products = await db("products").select("*").where("id", function(){
  //     this
  //     .select("categories_products.product_id")
  //     .from("categories_products")
  //     .whereRaw("categories_products.product_id = products.id")
  //     .where("categorie_id", id)
  //   })
  //   return products
  // }
  const getProductById = async(id) => {
    const product = await db("products").select("*").where("id",id)
    return product[0]
  }

  return{
    getProductsByCategoryId,
    getProductById
  }

}
module.exports = init