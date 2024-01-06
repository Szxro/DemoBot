import { ICommand } from "../types/comands";

class CommandHandler {
  constructor(public builder: ICommand) {}

  static IsACommand(command: unknown): command is CommandHandler {
    return (
      (command as CommandHandler).builder.name !== undefined &&
      (command as CommandHandler).builder.description !== undefined &&
      (command as CommandHandler).builder.callback !== undefined
    );
  }
}

export default CommandHandler;
