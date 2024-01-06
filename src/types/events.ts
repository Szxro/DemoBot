import { Awaitable, ClientEvents } from "discord.js";
import ClientHandler from "../structs/client-handler";

export type LogMethod = (...args: unknown[]) => void;

// Represent all the keys avaliables for the events
export type EventKeys = keyof ClientEvents;

// Props that will pass through the event callback
export type EventProps = { logger: LogMethod; client: ClientHandler };

export type EventCallback<T extends EventKeys> = (
  props: EventProps,
  // Represent the args for the selected client event
  ...args: ClientEvents[T]
) => Awaitable<unknown>;
// Awaitable represent maybe a promise or not

// EventKeys = EventKeys (default values)
export interface IEvent<T extends EventKeys = EventKeys> {
  key: T;
  once?: boolean;
  callback: EventCallback<T>;
}
