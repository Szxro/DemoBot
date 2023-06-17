import { BotEvent } from "../../classes/BotEvent";

export default new BotEvent({
  eventName: "error",
  action: (err) => {
    console.error(err);
  },
});
