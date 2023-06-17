import { BotEvent } from "../../classes/BotEvent";

export default new BotEvent({
  eventName: "warn",
  action: (info) => {
    console.warn(info);
  },
});
