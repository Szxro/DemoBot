import { BotEvent } from "../../classes/BotEvent";

export default new BotEvent({
  eventName: "ready",
  action: (interaction) => console.log(`${interaction.user.username} is ready`),
});
