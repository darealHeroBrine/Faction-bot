exports.run = (client, message) =>{
      
  if(message.author.id !== config.ownerID) 
      return
    message.channel.send({embed: {
    color: 3447003,
    description: "Hello this is in beta and still being developed! If you have any suggestions make one in -new subject."
  }
})};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['motd'],
  permLevel: 0
};

exports.help = {
  name: 'messag of the day',
  description: 'Displays the message of the day from the bot dev.',
  usage: 'messageOfTheDay'
};