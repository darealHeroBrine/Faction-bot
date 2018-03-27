exports.run = (client, message, args) => {
    message.channel.send("pong!").catch(console.error);
};


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['p'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'ping',
    description: 'ping pong the time it responds will show',
    usage: 'ping'
  };