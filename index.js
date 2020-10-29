const mineflayer = require('mineflayer')
const acc = require("./bot.json")
const config = require("./config.json")
const Discord = require("discord.js")
var tpsPlugin = require('mineflayer-tps')(mineflayer)
const path = require('path')

const client = new Discord.Client()

//when bot logs into discord 
//logs in console
client.on("ready", ()=>{
  console.log(`Client Logged in ${client.user.tag}`)
})


//creates bot
//this is only for cracked if you want it for online replace this with 


//const bot = mineflayer.createBot({
//  host: config.minecraft.ip, 
//  port: config.minecraft.port,       
//  email: "<you actual minecraft email>",
//  password: "<you actual minecraft password>", 
//  version: false
//})


const bot = mineflayer.createBot({
  host: config.minecraft.ip, 
  port: config.minecraft.port,       
  username: acc.offline.name, 
  version: false
})

//when bot logs in
bot.on("login", ()=> {
  console.log(`Logged in as ${bot.username}\nServer: ${config.minecraft.serverIP}`)
  bot.chat(` ${config.minecraft.join}`)
})

//embed in game chat one way
bot.on("message", async message => {
  let chat = message.toString()
  console.log(chat)
  if(chat.length < 1) return
  if(chat == undefined) return
    
  const chatEmbed = new Discord.MessageEmbed()
  .setDescription(`${chat}`)
  .setColor("#002FFF");

  client.channels.cache.get(config.channels.id).send(chatEmbed)
})
//tps plugin not very reliable
bot.loadPlugin(tpsPlugin) 
//basic listeners 
bot.on('chat', (username, message) => {
  if (username === bot.username) return
  if (message.startsWith('!tps')) {
    bot.chat('Current tps: ' + bot.getTps())
  }else if (message.startsWith('!op')) {
    bot.chat(`Server has now oped ${username}`)
  }else if (message.startsWith(`!kill ${username}`)) {
    bot.chat(`${username} has been killed!`)
  }else if (message.startsWith('!rules')) {
    bot.chat(`NO HACKING, NO SWEARING, NO GRIEFING, NO KILLING, NO DUPING, AND NO BEING MEAN!`)
  }else if (message.startsWith(`!report ${username}`)) {
    bot.chat(`${username} has been reported admin will deal with them shortly.`)
  }else if (message.startsWith(`!yes`)) {
    bot.chat(`YES`)
  }else if (message.startsWith(`!no`)) {
    bot.chat(`NO`)
  }else if (message.startsWith(`!seed`)) {
    bot.chat(`-4172144997902289642`)
  }else if (message.startsWith(`!hi`)) {
    bot.chat(`Hello`)
  }else if (message.startsWith(`!help`)) {
    bot.chat(`commands can be found here --> ${config.minecraft.help}`)
  }

})

//if you want to add more to to second last bracket and past this

//else if (message.startsWith(`<prefix with command like !help>`)) {
//  bot.chat(`<what you want the bot to say>`)
//}

//and you can add as much as you want 



//logs bot in 
client.login(config.discord.token)