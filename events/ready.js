const chalk = require('chalk');
module.exports = client => { // eslint-disable-line no-unused-vars
  console.log(chalk.bgGreen.black('Ready to server in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.'));
};