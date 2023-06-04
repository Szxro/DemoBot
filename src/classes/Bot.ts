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
import { FileUtil } from "../util/FileUtil";

import { CommandType } from "../types/commandType";

export class DemoBot extends Client {
  commands: Collection<string, CommandType> = new Collection(); // this is used to get the name of the command more izi
  slashCommands: ApplicationCommandDataResolvable[] = []; // this is used to upload or update the commands
  private readonly util = new FileUtil(); // util class of the bot for files

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

    const commandFiles = await this.util.loadFiles({
      // loading the files
      pattern: `${__dirname}/../commands/*/*{.ts,.js}`,
    });

    for (const commandFile of commandFiles) {
      const command = await this.util.importFiles({ path: commandFile }); // importing files

      if (!(command instanceof BotCommads)) {
        console.log("Something happen with the commands");
        return;
      }
      this.commands.set(command.options.name, command.options); // setting the commands
      this.slashCommands.push(command.options.command);
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
    const eventFiles = await this.util.loadFiles({
      pattern: `${__dirname}/../events/*/*{.ts,.js}`,
    });

    for (const eventFile of eventFiles) {
      const event = await this.util.importFiles({ path: eventFile });

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

// ?? Notes:

// ?? PresenceData => ActivityOptions[] = [name:"name_activity,type:ActivityType_enum,url"] <= presence
