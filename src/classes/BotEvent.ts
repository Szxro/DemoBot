import { ClientEvents } from "discord.js";
import { EventType } from "../types/eventType";

export class BotEvent<Key extends keyof ClientEvents> {
  constructor(public options: EventType<Key>) {}
}
