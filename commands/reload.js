exports.run = (client, message, args) => {
 // if(message.author.id !== config.ownerID) return;
  if(!args || args.size < 1) return message.reply("Must provide a command name to reload.");
    // the path is relative to the *current folder*, so just ./filename.js
    delete require.cache[require.resolve(`./${args[0]}.js`)];
    message.reply(`The command ${args[0]} has been reloaded`);
  };


  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['rl'],
    permLevel: 10
  };
  
  exports.help = {
    name: 'Reload',
    description: 'This will Reload any command.',
    usage: 'reload <command>'
  };