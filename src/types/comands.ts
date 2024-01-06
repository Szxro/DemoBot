import {
  Awaitable,
  CacheType,
  CommandInteraction,
  CommandInteractionOptionResolver,
  GuildMember,
  PermissionResolvable,
} from "discord.js";
import ClientHandler from "../structs/client-handler";

// type extension to include the GuildMembet abstract class
export type ExtendedInteraction = { member: GuildMember } & CommandInteraction;

export type CommandProps = {
  client: ClientHandler;
  // Represents the command interaction
  interaction: CommandInteraction;
  //A resolver for command interaction options.
  args: Omit<
    CommandInteractionOptionResolver<CacheType>,
    "getMessage" | "getFocused"
  >;
};

export type CommandCallback = (props: CommandProps) => Awaitable<unknown>;

export interface ICommand {
  name: string;
  description: string;
  callback: CommandCallback;
  cooldown?: number;
  userPermission?: PermissionResolvable[]; // Permission to execute the command
}

// ChatInputApplicationCommandData
