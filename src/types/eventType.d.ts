import { ClientEvents } from "discord.js";

export type EventType<Key extends keyof ClientEvents> = {
  event: Key;
  once?: boolean;
  action: (...args: ClientEvents[Key]) => any;
};
