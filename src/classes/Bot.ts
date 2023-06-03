import {
  ApplicationCommandDataResolvable,
  Client,
  Routes,
  Collection,
  REST,
} from "discord.js";
require("dotenv").config();

import { loadFiles, importFiles } from "../utils/BotUtils";
import { BotEvent } from "./BotEvent";
import { CommandType } from "../types/commandType";
import { BotCommads } from "./BotCommands";

export class DemoBot extends Client {
  commands: Collection<string, CommandType> = new Collection(); // this is used to get the name of the command more izi
  slashCommands: ApplicationCommandDataResolvable[] = []; // this is used to upload or update the commands

  constructor() {
    super({ intents: 32767 }); // 32767 is all the intents
  }

  init() {
    this.loadEvents();
    this.loadCommands();
    this.login(process.env.TOKEN_BOT);
  }

  async loadCommands(): Promise<void> {
    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN_BOT!);

    const commandFiles = await loadFiles({
      // loading the files
      pattern: `${__dirname}/../commands/*/*{.ts,.js}`,
    });

    for (const commandFile of commandFiles) {
      const command = await importFiles({ path: commandFile }); // importing files

      if (!(command instanceof BotCommads)) {
        console.log("Something happen with the commands");
        return;
      }
      this.commands.set(command.options.name, command.options); // setting the commands
      this.slashCommands.push(command.options.command);
    }

    await rest.put(
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
    const eventFiles = await loadFiles({
      pattern: `${__dirname}/../events/*/*{.ts,.js}`,
    });

    for (const eventFile of eventFiles) {
      const event = await importFiles({ path: eventFile });

      if (!(event instanceof BotEvent)) {
        console.log("Something happen with the events");
        return;
      }

      //setting the events
      if (event.options.once !== undefined) {
        this.once(event.options.event, event.options.action);
      }

      this.on(event.options.event, event.options.action);
    }
  }
}
