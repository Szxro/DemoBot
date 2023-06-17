import { ClientEvents } from "discord.js";
import { EventOptions } from "../types/eventOptions";

export class BotEvent<Key extends keyof ClientEvents> {
  constructor(public eventOptions: EventOptions<Key>) {}
}
