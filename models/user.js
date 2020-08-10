const bcrypt = require('bcryptjs')

const generatePassHash = passwd =>{
   const salt = bcrypt.genSaltSync(10)
   const hash = bcrypt.hashSync(passwd, salt)
   return hash
}

const initialUser= db => async(id) => {
  const count = await db("users").count('id as total')
  if(count[0].total === 0){
    const user = {
      name: 'Admin',
      email: "admin@devshop.com.br",
      passwd: generatePassHash('MinhaSenhaDificil!'),
      email_checked: true,
      created: new Date(),
      updated: new Date(),
      roles: 'admin,financial,customer'
    }
    await db('users').insert(user)
  }
}

module.exports = {
  initialUser
}