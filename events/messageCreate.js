const { Events } = require("discord.js");
const { client } = require("../client.js");
const { addToQueue } = require("../queue.js");
const { getUserFromMention, wordCounter } = require("../helpers.js");

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if (message.mentions.has(client.user)) {
      const split_message = message.content.split(" ");
      let formatted_message = "";

      split_message.forEach((message, i) => {
        const snippet = getUserFromMention(message);

        if (snippet) {
          const isBot = snippet.id === client.user.id;

          if (!(i == 0 && isBot)) {
            if (isBot) formatted_message += "'Gub Gub' ";
            else formatted_message += `'${snippet.globalName}' `;
          }
        } else formatted_message += `${message} `;
      });

      await addToQueue({
        type: "gpt",

        content: formatted_message,
        name: message.author.globalName,
        attachments: message.attachments,

        interaction: message,
      });
    }

    if (message.author.bot) return;

    const gubbedAmount = wordCounter(message.content, "gub");

    if (gubbedAmount > 0) {
      await addToQueue({
        type: "gub",

        counter: gubbedAmount,
        interaction: message,
      });
    }
  },
};
