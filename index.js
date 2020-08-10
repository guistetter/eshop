const db = require("knex")({
  client: "mysql2",
  connection: {
    host: '127.0.0.1',
    user: "root",
    password: "123456",
    database: "devShop"
  }
})

const app = require("./app")(db)
const port = process.env.PORT || 3000

const user = require('./models/user')
user.initialUser(db)()

db.on("query", query => {
  console.log("SQL debug:", query.sql)
})

app.listen(port, err =>{
  if(err){
    console.log("nao foi possivel iniciar servidor")
  } else {
    console.log("devShop server rodando")
  }
})