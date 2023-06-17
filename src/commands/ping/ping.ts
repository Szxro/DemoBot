import { CommandInteraction } from "discord.js";
import { BotCommads } from "../../classes/BotCommands";

export default new BotCommads({
  name: "ping",
  // command: new SlashCommandBuilder()
  //   .setName("ping")
  //   .setDescription("replies with pong to the user"),
  description: "replies with the pong to the user",
  execute: async (interaction: CommandInteraction) => {
    interaction.reply("Pong!");
  },
});
