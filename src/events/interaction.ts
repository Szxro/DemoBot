import Guard from "../guards/guard";
import EventHandler from "../structs/event-handler";

export default new EventHandler({
  key: "interactionCreate",
  callback: async ({ client }, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    //client.commands => commands that are save in the client handler
    const command = Guard.Against.NullOrUndefined(
      client.slashCommandMap.get(interaction.commandName),
      "command"
    ); // the guard is going to throw an exception

    await command.callback({ client, interaction, args: interaction.options });
  },
});
