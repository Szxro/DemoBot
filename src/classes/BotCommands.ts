import { CommandType } from "../models/commandType.model";

export class BotCommads {
  constructor(public commandOptions: CommandType) {
    Object.assign(this, commandOptions);
  }
}
