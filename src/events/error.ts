import EventHandler from "../structs/event-handler";

export default new EventHandler({
  key: "error",
  callback: ({ logger }, err) => {
    logger("Unhandled error", err);
  },
});
