import EventHandler from "../structs/event-handler";

export default new EventHandler({
  key: "messageCreate",
  callback: ({ logger }, message) => {
    logger(`A message was created by ${message.author.username}`);
  },
});
