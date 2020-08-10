const user = require('../models/user')

const login = db => async(req, res) => {
  try{
    const userFromDb = await user.login(db)(req.body.email, req.body.passwd)
    req.session.user = userFromDb
    res.redirect('/')
    //res.send(userFromDb)
    //res.send(req.body)
  }catch(err){
    res.send('Error ' + err)
  }
  
}

module.exports ={
  login
}