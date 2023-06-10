import { CommandType } from "../types/commandType";

export class BotCommads {
  constructor(public commandOptions: CommandType) {
    Object.assign(this, commandOptions);
  }
}
