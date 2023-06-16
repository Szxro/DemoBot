import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
import { BotCommads } from "../../classes/BotCommands";
import { EmbedBuilder } from "@discordjs/builders";
import { PokemonService } from "../../services/http/PokemonService";
import { CommandTypeOptions } from "../../types/commandType";
import { ExceptionService } from "../../services/exception/ExceptionService";

export default new BotCommads({
  name: "searchpokemon",
  description: "replies a pokemon",
  options: [
    {
      name: "pokename",
      description: "required the name of the pokemon to search",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ] as CommandTypeOptions[],
  execute: async (interaction: CommandInteraction) => {
    await interaction.deferReply(); // defering the response

    //getting the option result (is required)
    const optionResult = interaction.options.get("pokename")?.value?.toString();

    const pokeService = new PokemonService({
      pokeName: optionResult!.toLowerCase(),
      url: process.env.POKE_URL!,
    }); // making a new service instance

    const handler = new ExceptionService({
      // making a new exception handler instance
      fun: pokeService.getByItemName.bind(pokeService),
      ctx: interaction,
    });
    // need to use bind to replace the this keyword of exceptionService with the this of PokeService class

    const result = await handler.executeRequest(); // executing the request
    if (result !== undefined) {
      const pokeEmbed = new EmbedBuilder() // creating the embed
        .setColor(0x0099ff)
        .setTitle(result.name.toUpperCase())
        .setThumbnail(result.sprites.front_shiny)
        .setImage(result.sprites.front_default)
        .addFields([
          {
            name: "First Move",
            value: result.moves[0]?.move.name ?? "Not Move",
            inline: true,
          },
          {
            name: "Second Move",
            value: result.moves[1]?.move.name ?? "Not Second Move",
            inline: true,
          },
        ])
        .setTimestamp();

      await interaction.editReply({ embeds: [pokeEmbed] }); // sending the embed (have to be a array of embeds)
    }
  },
});
