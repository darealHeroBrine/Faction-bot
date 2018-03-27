exports.run = (client, message, args) => {
    message.channel.send("you are in the Photoshop faction").catch(console.error);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'faction',
    description: 'says what faction you are in. [not ready]',
    usage: 'faction'
  };