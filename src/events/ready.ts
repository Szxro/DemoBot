import EventHandler from "../structs/event-handler";

export default new EventHandler({
  key: "ready",
  callback: ({ logger, client }) => {
    logger(`Logged in as ${client.user?.username}`);
  },
});
