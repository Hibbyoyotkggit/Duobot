const Discord = require("discord.js")
const fetch = require("node-fetch")
const Database = require("@replit/database")
const keepalive = require("./server")

const db = new Database()



const client = new Discord.Client()

const sadwords = ["sad","angry","unhappy"]
const sencourage = [
  "Keep Going",
  "Have a nice day",
  "Ghari ja Ghari"
]

db.get("encourage").then(encourage => {
  if (!encourage || encourage.length < 1) {
    db.set("encourage", sencourage)
  }
})


db.get("responding").then(value => {
  if (value == null) {
    db.set("responding", true)
  }
})



function updateencourage(em){
  db.get("encourage").then(encourage => {
    encourage.push([em])
    db.set("encourage", encourage)
  })
}

function deleteencourage(index) {
  db.get("encourage").then(encourage => {
    if (encourage.length > index){
      encourage.splice(index,1)
      db.set("encourage",encourage)  

    }

  })
}





function getQuote(){
  return fetch("https://zenquotes.io/api/random")
    .then(res => {
      return res.json()
    })
    .then(data => {
      return data[0]["q"] + " - " + data[0]["a"]

    })
} 

client.on("ready",() => {
  console.log(`Logged in as ${client.user.tag}`)
})

client.on("message", msg => {
  if (msg.author.bot) return

  if (msg.content === ".quote"){
    getQuote().then(quote => msg.channel.send(quote))
  }
  
  db.get("responding").then(responding =>{
    if (responding && sadWords.some(word => msg.content.includes(word))) {
      db.get("encourage").then(encourage => {
        const encouragement = encourage[Math.floor(Math.random() * encourage.length)]
        msg.reply(encouragement)
      })
    }
  })

  if (msg.content.startsWith(".new")){
    em = msg.content.split(".new ")[1]
    updateencourage(em)
    msg.channel.send("New Encouraging message added")
  }

  if (msg.content.startsWith(".del")){
    index = parseInt(msg.content.split(".del ")[1])
    deleteencourage(index)
    msg.channel.send("Encouraging Message Deleted Successfully")  
  }

  if (msg.content.startsWith(".list")){
    db.get("encourage").then(encourage =>{
      msg.channel.send(encourage)
    })
  }

  if (msg.content.startsWith(".responding")) {
    value = msg.content.split(".responding ")[1]

    if (value.toLowerCase() == "true") {
      db.set("responding", true)
      msg.channel.send("Responding is on.")
    } else {
       db.set("responding", false)
      msg.channel.send("Responding is off.")     
    }
  }


})
keepalive()
client.login(process.env.Token)