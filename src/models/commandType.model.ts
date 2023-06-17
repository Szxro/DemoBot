import { PermissionResolvable } from "discord.js";

export interface CommandType {
  permission?: PermissionResolvable[];
  cooldown?: number;
  name: string;
  //command: SlashCommandBuilder;
  description: string;
  execute: (...args: any) => any;
  options?: any;
} //TODO: search a better way to do a CommandType
