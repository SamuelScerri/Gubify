import { readdirSync } from "node:fs";
import { join } from "node:path";
import { Collection } from "discord.js";
import { client } from "./client.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function initializeCommands() {
  client.commands = new Collection();
  const foldersPath = join(__dirname, "commands");
  const commandFolders = readdirSync(foldersPath);

  for (const folder of commandFolders) {
    const commandsPath = join(foldersPath, folder);
    const commandFiles = readdirSync(commandsPath).filter((file) =>
      file.endsWith(".js"),
    );
    for (const file of commandFiles) {
      const filePath = join(commandsPath, file);
      const command = await import(filePath);

      if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
      } else {
        console.log(
          `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
        );
      }
    }
  }

  const eventsPath = join(__dirname, "events");
  const eventFiles = readdirSync(eventsPath).filter((file) =>
    file.endsWith(".js"),
  );

  for (const file of eventFiles) {
    const filePath = join(eventsPath, file);
    const event = await import(filePath);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }

  client.login(process.env.TOKEN);
}

initializeCommands();
