const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gubify")
    .setDescription("Gubify your message!")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("The message that I will Gubify!")
        .setRequired(true)
        .setMaxLength(6000),
    )
    .addStringOption((option) =>
      option
        .setName("gub")
        .setDescription("A Gub I will use to Gubify the message!"),
    ),
  async execute(interaction) {
    const message =
      interaction.options.getString("message") ?? "No message provided";

    const gub = interaction.options.getString("gub") ?? "gub";

    const gubifiedMessage = message
      .split(" ")
      .filter((token) => token.trim() !== "")
      .map((token) => gub + token)
      .join(" ");

    await interaction.reply(gubifiedMessage);
  },
};
