import { SlashCommandBuilder } from "discord.js";
import { gptReset } from "../../gubgpt.js";

export const data = new SlashCommandBuilder()
  .setName("gubotamize")
  .setDescription("Wait, what are you doing?");

export async function execute(interaction) {
  await gptReset();
  await interaction.reply("AHHHHH");
}
