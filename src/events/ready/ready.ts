import { CommandInteraction } from "discord.js";
import { BotEvent } from "../../classes/BotEvent";

export default new BotEvent({
  event: "ready",
  action: (interaction) => console.log(`${interaction.user.username} is ready`),
});
