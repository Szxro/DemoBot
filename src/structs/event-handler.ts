import { EventKeys, IEvent } from "../types/events";

class EventHandler<Key extends EventKeys = EventKeys> {
  constructor(public builder: IEvent<Key>) {}

  static IsAnEvent(event: unknown): event is EventHandler {
    return (
      (event as EventHandler).builder.key !== undefined &&
      (event as EventHandler).builder.callback !== undefined
    );
  }
}

export default EventHandler;
