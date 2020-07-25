const express = require("express")
const app = express()
const port = process.env.PORT || 3000

app.get("/", (req,res) => {
res.send("DevShop")
})

app.listen(port, err =>{
  if(err){
    console.log("nao foi possivel iniciar servidor")
  } else {
    console.log("devShop server rodando")
  }
})