import CommandHandler from "../structs/command-handler";

export default new CommandHandler({
  name: "ping",
  description: "replies with pong",
  callback: async ({ interaction }) => {
    await interaction.reply({ content: "Pong" });
  },
});
