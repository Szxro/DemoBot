import {
  ApplicationCommandDataResolvable,
  Client,
  Collection,
  REST,
  Routes,
} from "discord.js";
import { join } from "path";
import { CONFIG_KEYS } from "../config/keys";
import FileService from "../services/fileService";
import { ICommand } from "../types/comands";
import Util from "../utils/util";
import CommandHandler from "./command-handler";
import EventHandler from "./event-handler";

class ClientHandler extends Client {
  private readonly _fileService: FileService;
  public slashCommandMap: Collection<string, ICommand> = new Collection();
  public slashCommand: ApplicationCommandDataResolvable[] = [];

  constructor(fileService: FileService) {
    super({ intents: 32767 });

    this._fileService = fileService;
  }

  init(): void {
    this.registerEvents();
    this.registerSlashCommands();
    this.login(CONFIG_KEYS.TOKEN);
  }

  private async registerEvents(): Promise<void> {
    const eventsPath = await this._fileService.getFilesByPattern({
      pattern: `${join(process.cwd(), "src/events")}/*[.ts,.js]`,
    });

    for (let eventPath of eventsPath) {
      const instance = await this._fileService.importFile({
        path: join(process.cwd(), eventPath),
      });

      if (EventHandler.IsAnEvent(instance)) {
        const { key, once, callback } = instance.builder;

        const logger = console.log.bind(console, `[Event]:${key}`);

        // args is an array of current events of the clients (and register events)
        this.on(key, (...args) => {
          Util.tryCallback(callback, logger, key, this, args);
        });

        if (once !== undefined) {
          this.once(key, (...args) => {
            Util.tryCallback(callback, logger, key, this, args);
          });
        }
      }
    }
  }

  private async registerSlashCommands(): Promise<void> {
    const rest = new REST({ version: "9" }).setToken(CONFIG_KEYS.TOKEN);

    const commandsPath = await this._fileService.getFilesByPattern({
      pattern: `${join(process.cwd(), "src/commands")}/*[.ts,.js]`,
    });

    for (const commandPath of commandsPath) {
      const instance = await this._fileService.importFile({
        path: join(process.cwd(), commandPath),
      });

      if (CommandHandler.IsACommand(instance)) {
        this.slashCommandMap.set(instance.builder.name, instance.builder);
        this.slashCommand.push(instance.builder);
      }
    }

    // registering globally the commands in the application (bot)
    await rest.put(Routes.applicationCommands(CONFIG_KEYS.CLIENT_ID), {
      body: this.slashCommand,
    });
  }
}
export default ClientHandler;
