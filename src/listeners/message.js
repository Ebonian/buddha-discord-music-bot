module.exports = {
  name: "message",
  run: async (client, msg) => {
    if (!msg.guild) return;
    if (msg.author.bot) return;

    const prefix = msg.content.toLowerCase().startsWith(client.prefix)
      ? client.prefix
      : `<@!${client.user.id}>`;
    if (!msg.content.toLowerCase().startsWith(prefix)) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();
    const command =
      client.commands.get(commandName) ||
      client.commands.find((c) => c.aliases && c.aliases.includes(commandName));
    if (command) {
      console.log(command);
      try {
        await command.run(msg, args);
      } catch (e) {
        console.error(e);
      }
    }
  },
};
