//tratar a msg de erro
const extractErrors = error =>{
  return error.details.reduce((previous, current) => {
    //se existe o path do erro 
    if(previous[current.path[0]]){
      //add o erro no vetor
        previous[current.path[0]].push(current.type)
    } else {
      previous[current.path[0]] = [current.type]
    }
    return previous
  }, {})
}

const validate = (obj, schema) => {  
  const {error, value } = Joi.validate(category, createSchema ,{abortEarly:false, stripUnknown: true})
  if(error){
    //console.log(extractErrors(error))
    //lancando o erro para o controller
    throw new Error({message: 'validation', errors: extractErrors(error)}) 
  }
}
module.exports = {
  validate
}