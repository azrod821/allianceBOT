const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require("ytdl-core");
const { Client, MessageEmbed } = require('discord.js');
const prefix = ".";
client.on('ready', () => {
  console.log(`conecter ${client.user.tag}!`);
  client.user.setActivity("En maintenance", { type:'STREAMING'}).catch(console.error);
});
//////////////////////////////////////////////////////////////////////////////////////////////Musique//////////////////////////////////////////////////////////////////////////////////////////////
client.on("message", message =>{
    if(message.content.startsWith(prefix + "play")){
        if(message.member.voice.channel){
            message.member.voice.channel.join().then(connection => {
                let args = message.content.split(" ");
                
                let dispatcher = connection.play(ytdl(args[1],{quality: "highestaudio"}));
                dispatcher.on("finish", () =>{
                    dispatcher.destroy();
                    connection.disconnect();
                });
                dispatcher.on("error", err =>{
                    console.log("erreur musique" + err);
                })
            }).catch(err =>{
                message.reply("erreur lors de la connexion :" + err);
            });
        }
        else{
            message.reply("pdst")
        }

    }
});
//////////////////////////////////////////////////////////////////////////////////////////////EMBED//////////////////////////////////////////////////////////////////////////////////////////////

client.on('message', message => {
    if (message.content === 'pdst') {
      const embed = new MessageEmbed()
        .setTitle('Erreur pdst')
        .setColor(0xff0000)
        .setDescription('Pas de salon trouvé');
      message.channel.send(embed);
    }
  });

//////////////////////////////////////////////////////////////////////////////////////////////Alliance calendrier//////////////////////////////////////////////////////////////////////////////////////////////

client.on('message', message => {
    if (message.content === prefix+'calendrier') {
      const embed = new MessageEmbed()
        .setTitle('Calendrier des alliances')
        .setColor(0xff8000)
        .setDescription('Aucune alliance de prévue')
        .setThumbnail('https://cdn.discordapp.com/attachments/140551113525952512/839565251674112000/pp.jpg')
      message.channel.send(embed);
    }
  });



client.login(process.env.TOKEN);