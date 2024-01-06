import EventHandler from "../structs/event-handler";

export default new EventHandler({
  key: "warn",
  callback: ({ logger }, message) => {
    logger(`Warning: ${message}`);
  },
});
