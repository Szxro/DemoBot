import { BotEvent } from "../../classes/BotEvent";

export default new BotEvent({
  event: "warn",
  action: (info) => {
    console.warn(info);
  },
});
