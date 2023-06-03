import { CommandType } from "../types/commandType";

export class BotCommads {
  constructor(public options: CommandType) {
    Object.assign(this, options);
  }
}

// ?? Notes:

// ?? Object.assign => return the target object (CommandType)
