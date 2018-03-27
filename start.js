/*
// const
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const config = require("./config.json");

//const prefix = (config.prefix);


// the rest


client.on("ready", () => {
  console.log("I am ready!");
  //message.channel.send("I'm running can you keep up?");
});
//if(message.author.id !== config.ownerID) return message.channel.send("pong!");;
// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    // super-secret recipe to call events with all their proper arguments *after* the `client` var.
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});
//cmds atm

client.on("message", (message) => {
 if (message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;

  // This is the best way to define args. Trust me.
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // The list of if/else is replaced with those simple 2 lines:
  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, args);
  } catch (err) {
    console.error(err);
  }/*else
	 // our new check:
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;
  // [rest of the code]
  
  if (message.content.startsWith(config.prefix + "ping")) {

    message.channel.send("pong!");
  }else

  if (message.content.startsWith(config.prefix + "server")) {
    message.channel.send("nope");
  }else
	  
  if (message.content.startsWith(config.prefix + "loop")) {
    message.channel.send("nah");
  }else
  
  if (message.content.startsWith(config.prefix + "setstatus")) {
    message.channel.send("not ready");
  }else
	  
  
    if (message.content.startsWith(config.prefix + "setgame")) {
    message.channel.send("not ready");
  }/*else

if(message.content.startsWith(config.prefix + "prefix")) {
  // Gets the prefix from the command (eg. "!prefix +" it will take the "+" from it)
  let newPrefix = message.content.split(" ").slice(1, 2)[0];
  // change the configuration in memory
  config.prefix = newPrefix;

  // Now we have to save the file.
  fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
}*/


//new .js code
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  log(`Loading a total of ${files.length} commands.`);
  files.forEach(f => {
    const props = require(`./commands/${f}`);
    log(`Loading Command: ${props.help.name}. 👌`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      const cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  /* This function should resolve to an ELEVATION level which
     is then sent to the command handler for verification*/
  let permlvl = 0;
  const mod_role = message.guild.roles.find('name', config.modrolename);
  if (mod_role && message.member.roles.has(mod_role.id)) permlvl = 2;
  const admin_role = message.guild.roles.find('name', config.adminrolename);
  if (admin_role && message.member.roles.has(admin_role.id)) permlvl = 3;
  const support_role = message.guild.roles.find('name', process.env.SUPPORT);
  if (support_role && message.member.roles.has(support_role.id)) permlvl = 4;
  if (message.author.id === process.env.OWNER_ID) permlvl = 10;
  return permlvl;
};


var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});



client.login(process.env.BOT_TOKEN);
