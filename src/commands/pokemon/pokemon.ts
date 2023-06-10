import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
import { BotCommads } from "../../classes/BotCommands";
import { EmbedBuilder } from "@discordjs/builders";
import { PokemonService } from "../../services/http/PokemonService";
import { CommandTypeOptions } from "../../types/commandType";

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

    const pokeService = new PokemonService(); // making a new service instance
    try {
      const result = await pokeService.getPokemonByName({
        // making the request
        pokeName: interaction.options
          .get("pokename")
          ?.value?.toString()
          .toLowerCase()!,
      });

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
            value: result.moves[1]?.move.name ?? "Not Move",
            inline: true,
          },
        ])
        .setTimestamp();

      await interaction.editReply({ embeds: [pokeEmbed] }); // sending the embed (have to be a array of embeds)
    } catch (err: unknown) {
      if (err instanceof Error || err instanceof TypeError) {
        await interaction.editReply({
          content: `Something happen with the request, ${err.message}`,
        });
      }
      console.log(err);
      await interaction.editReply({
        content: `Something happen with the request, check the logger`,
      });
    }
  },
});
