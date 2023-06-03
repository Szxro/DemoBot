import { client } from "../..";
import { BotEvent } from "../../classes/BotEvent";

export default new BotEvent({
  event: "interactionCreate",
  action: async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
      interaction.followUp({ content: "You have used a non existent command" });
      return;
    }

    await command.execute(interaction);
  },
});

// !! The slashCommands can take 5-10 min to update or add to the discord bot
