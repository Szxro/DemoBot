import {
  ApplicationCommand,
  ApplicationCommandOptionType,
  CommandInteraction,
  CommandInteractionOptionResolver,
  PermissionResolvable,
  SlashCommandBuilder,
} from "discord.js";

export type CommandTypeOptions = CommandTypeOptionsProps & {
  required?: boolean;
  type: ApplicationCommandOptionType;
};

type CommandTypeOptionsProps = Pick<
  CommandType,
  "name" | "description" | "permission"
>;
