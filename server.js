const express = require("express")
const server = express()

server.all("/", (req, res) => {
   res.send("Bot is Running!")
})

function keepalive() {
  server.listen(3000,() =>{
    console.log("server is ready")
  })
}

module.exports = keepalive
