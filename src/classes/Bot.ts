import {
  ApplicationCommandDataResolvable,
  Client,
  Routes,
  Collection,
  REST,
  ActivityType,
} from "discord.js";
require("dotenv").config();

import { BotEvent } from "./BotEvent";
import { BotCommads } from "./BotCommands";
import { FileService } from "../services/files/FileService";
import { CommandType } from "../models/commandType.model";

export class DemoBot extends Client {
  commands: Collection<string, CommandType> = new Collection(); // this is used to get the name of the command more izi
  slashCommands: ApplicationCommandDataResolvable[] = []; // this is used to upload or update the commands
  private readonly fileService = new FileService(); // util class of the bot for files

  constructor() {
    super({
      intents: 32767, // 32767 is all the intents
      presence: {
        // presence of the bot in the server
        activities: [{ name: "to be a human", type: ActivityType.Playing }],
      },
    });
  }

  init() {
    this.loadEvents();
    this.loadCommands();
    this.login(process.env.TOKEN_BOT);
  }

  async loadCommands(): Promise<void> {
    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN_BOT!);

    const commandsFilePath = await this.fileService.loadFiles({
      // loading the files
      pattern: `${__dirname}/../commands/*/*{.ts,.js}`,
    });

    for (const commandFilePath of commandsFilePath) {
      const command = await this.fileService.importFiles({
        path: commandFilePath,
      }); // importing files

      if (!(command instanceof BotCommads)) {
        console.log("Something happen with the commands");
        return;
      }
      this.commands.set(command.commandOptions.name, command.commandOptions); // setting the commands
      this.slashCommands.push(command.commandOptions);
    }

    await rest.put(
      //uploading or updating the commands
      Routes.applicationGuildCommands(
        process.env.APPLICATION_ID!,
        process.env.SERVER_ID!
      ),
      {
        body: this.slashCommands,
      }
    );
  }

  async loadEvents(): Promise<void> {
    const eventsFilePath = await this.fileService.loadFiles({
      pattern: `${__dirname}/../events/*/*{.ts,.js}`,
    });

    for (const eventFilePath of eventsFilePath) {
      const event = await this.fileService.importFiles({ path: eventFilePath });

      if (!(event instanceof BotEvent)) {
        console.log("Something happen with the events");
        return;
      }

      //setting the events
      if (event.eventOptions.once !== undefined) {
        this.once(event.eventOptions.eventName, event.eventOptions.action);
      }

      this.on(event.eventOptions.eventName, event.eventOptions.action);
    }
  }
}
