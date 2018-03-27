exports.run = (client, message, [mention, ...reason]) => {
    const modRole = message.guild.roles.find("name", "Mods");
    if (!modRole)
      return console.log("The Mods role does not exist"),
      message.reply("The Mods role does not exist"),
      message.channel.send("The commands that require the \"Mods\" role are for moderation and to make sure non staff members cant use this command and the commands will not work untill this error is corrected");
  
    if (!message.member.roles.has(modRole.id))
      return message.reply("You can't use this command.");
  
    if (message.mentions.members.size === 0)
      return message.reply("Please mention a user to kick");
  
    if (!message.guild.me.hasPermission("KICK_MEMBERS"))
      return message.reply("No perms give me administrator or readd this bot for the required perms to be added.");
  
    const kickMember = message.mentions.members.first();
  
    kickMember.kick(reason.join(" ")).then(member => {
      message.reply(`${member.user.username} was succesfully kicked. :regional_indicator_r::regional_indicator_e::regional_indicator_m::regional_indicator_o::regional_indicator_v::regional_indicator_e: :ban:regional_indicator_d: ${member.user.username} from ${guild.name}`);
    });
  };

  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 2
  };
  
  exports.help = {
    name: 'kick',
    description: 'kicks the bad little elves',
    usage: 'kick <mention> <reasion>'
  };