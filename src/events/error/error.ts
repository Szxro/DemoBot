import { BotEvent } from "../../classes/BotEvent";

export default new BotEvent({
  event: "error",
  action: (err) => {
    console.error(err);
  },
});
