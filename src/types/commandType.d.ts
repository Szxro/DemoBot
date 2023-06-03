import {
  CommandInteraction,
  PermissionResolvable,
  SlashCommandBuilder,
} from "discord.js";

export interface CommandType {
  permission?: PermissionResolvable[];
  cooldown?: number;
  name: string;
  command: SlashCommandBuilder;
  execute: (...args: any) => any;
}
