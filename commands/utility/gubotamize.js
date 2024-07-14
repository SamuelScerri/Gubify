const { SlashCommandBuilder } = require("discord.js");
const { gptReset } = require("../../gubgpt");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gubotamize")
    .setDescription("Wait, what are you doing?"),
  async execute(interaction) {
    await gptReset();
    await interaction.reply("AHHHHH");
  },
};
