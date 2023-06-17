import { ClientEvents } from "discord.js";

export type EventOptions<Key extends keyof ClientEvents> = {
  eventName: Key;
  once?: boolean;
  action: (...args: ClientEvents[Key]) => any;
};
