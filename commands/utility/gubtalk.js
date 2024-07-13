const { OpenAI } = require("openai");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gubtalk")
    .setDescription("Talk to Gub Gub!")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("Message for Gub Gub!")
        .setRequired(true)
        .setMaxLength(6000),
    ),

  async execute(interaction) {
    /*if (run.status === "completed") {
      const messages = await openai.beta.threads.messages.list(run.thread_id);
      for (const message of messages.data.reverse()) {
        console.log(`${message.role} > ${message.content[0].text.value}`);
      }
    } else {
      console.log(run.status);
      }*/
  },
};
