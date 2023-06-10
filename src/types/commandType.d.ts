import {
  ApplicationCommand,
  ApplicationCommandOptionType,
  CommandInteraction,
  CommandInteractionOptionResolver,
  PermissionResolvable,
  SlashCommandBuilder,
} from "discord.js";

export interface CommandType {
  permission?: PermissionResolvable[];
  cooldown?: number;
  name: string;
  //command: SlashCommandBuilder;
  description: string;
  execute: (...args: any) => any;
  options?: any;
} //TODO: search a better way to do a CommandType

export type CommandTypeOptions = CommandTypeOptionsProps & {
  required?: boolean;
  type: ApplicationCommandOptionType;
};

type CommandTypeOptionsProps = Pick<
  CommandType,
  "name" | "description" | "permission"
>;
