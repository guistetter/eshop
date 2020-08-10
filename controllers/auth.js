const user = require('../models/user')

const login = db => async(req, res) => {
  const userFromDb = await user.login(db)(req.body.email, req.body.passwd)
  res.send(userFromDb)
  //res.send(req.body)
}

module.exports ={
  login
}