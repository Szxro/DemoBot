import { CommandInteraction } from "discord.js";
import { BotCommads } from "../../classes/BotCommands";

export default new BotCommads({
  name: "info",
  // command: new SlashCommandBuilder()
  //   .setName("info")
  //   .setDescription("replies with the ping of the bot"),
  description: "replies with the ping of the bot",
  execute: async (interaction: CommandInteraction) => {
    const reply = await interaction.deferReply();

    const ping = reply.createdTimestamp - interaction.createdTimestamp;

    interaction.editReply({
      content: `Pong! Client ${ping}ms | WebSocket ${interaction.client.ws.ping}ms`,
    });
  },
});
