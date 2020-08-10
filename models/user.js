const initialUser= db => async(id) => {
  const user = await db("users").count('*')
  console.log(user)
}

module.exports = {
  initialUser
}