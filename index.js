const Discord = require("discord.js")
const fetch = require("node-fetch")
const keepalive = require("./server")




const client = new Discord.Client()

const sadwords = ["fuck","gay","mf","motherfucker","ass"]
const encourage = [
  "These Words are not allowed here ",
  "No Foul Words here "
]









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
  client.user.setActivity("!help", {
  type: "LISTENING",
  })
})

client.on("message", msg => {
  if (msg.author.bot) return

    if (!msg.guild) return;


  if (msg.content === "!quote"){
    getQuote().then(quote => msg.channel.send(quote))
  }
  

    if (sadwords.some(word => msg.content.includes(word))) {
        const encouragement = encourage[Math.floor(Math.random() * encourage.length)]
        msg.reply(encouragement)
    }




  // To kick a member
  if (msg.content.startsWith('!kick')) {
    const user = msg.mentions.users.first();
    if (msg.member.hasPermission('KICK_MEMBERS')){
      if (user) {
        const member = msg.guild.member(user);
        if (member) {
          member
            .kick('Optional reason that will display in the audit logs')
            .then(() => {
              msg.reply(`Successfully kicked ${user.tag}`);
            })
            .catch(err => {
              message.reply('I was unable to kick the member');
              console.error(err);
            });
        } else {
          msg.reply("That user isn't in this guild!");
        }
      } else {
        msg.reply("You didn't mention the user to kick!");
      }
    }
  }
  
// To Ban a member
    if (msg.content.startsWith('!ban')) {
    const user = msg.mentions.users.first();
    if (msg.member.hasPermission('BAN_MEMBERS')){
      if (user) {
        const member = msg.guild.member(user);
        if (member) {
          member
            .ban({
              reason: 'They were bad!',
            })
            .then(() => {
              msg.reply(`Successfully banned ${user.tag}`);
            })
            .catch(err => {
              msg.reply('I was unable to ban the member');
              console.error(err);
            });
        } else {
          msg.reply("That user isn't in this guild!");
        }
      } else {
        msg.reply("You didn't mention the user to ban!");
      }
    }  
  }

  if (msg.content.startsWith('!clear')) {
    if (msg.member.hasPermission('ADMINISTRATOR')) {
      msg.channel.messages.fetch().then((results) => {
        msg.channel.bulkDelete(results)
      })
    }
  }


  const customcommands = new Discord.MessageEmbed()
	.setColor('#D62AD0')
	.setTitle(' Duo Bot (Custom Commands)')
  .addFields(
		{ name: '!quote', value: 'Random Quote', inline: true },
		{ name: '!canva', value: 'Canva Invitation', inline: true },
		{ name: '!movie', value: 'Stream Movie', inline: true },
    { name: '!linkedinlearn', value: 'linkedinlearning account', inline: true }
	)
   

 
    
  if (msg.content.startsWith('!help')){
    msg.channel.send(customcommands);  
  }
  
  if (msg.content.startsWith('!canva')){
    msg.reply(`Canva Pro LifeTime Subscription Invitation https://duocodies.cyou/canva`);  
  }

  if (msg.content.startsWith('!movie')){
    msg.reply(`Stream Movie https://duocodies.cyou/Movie`);  
  }

  if (msg.content.startsWith('!linkedinlearn')){
    msg.reply(`Process to create linkedin account https://duocodies.cyou/linkedinlearn`);  
  }
  

})

  const channelId = '857813800257978404' // welcome channel
  const targetChannelId = '857813800257978403' // rules and info

  client.on('guildMemberAdd', (member) => {
    const msg = `Please welcome <@${member.id}> to the server! Please check out ${member.guild.channels.cache
      .get(targetChannelId)
      .toString()}`

    const channel = member.guild.channels.cache.get(channelId)
    channel.send(msg)
  })






keepalive()
client.login(process.env.Token)