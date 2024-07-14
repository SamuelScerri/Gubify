const { Events } = require("discord.js");
const { setCounter, getCounter } = require("../leaderboard.js");
const { client } = require("../client.js");
const { gptReply } = require("../gubgpt.js");

const {
  MessageMentions: { USERS_PATTERN },
} = require("discord.js");

function getUserFromMention(mention) {
  if (mention.startsWith("<@") && mention.endsWith(">")) {
    mention = mention.slice(2, -1);

    if (mention.startsWith("!")) {
      mention = mention.slice(1);
    }

    return client.users.cache.get(mention);
  } else return null;
}

function wordCounter(word, test) {
  let counter = 0;

  let formattedWord = word
    .toLowerCase()
    .replace(/(.)\1+/g, "$1")
    .replace(/\s/g, "");

  const wordArray = formattedWord.split("");

  wordArray.forEach((char, i) => {
    if (wordArray.slice(i, i + 3).join("") === test) counter++;
  });

  return counter;
}

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if (message.mentions.has(client.user)) {
      await message.channel.sendTyping();

      const split_message = message.content.split(" ");
      let formatted_message = "";

      split_message.forEach((message, i) => {
        const snippet = getUserFromMention(message);

        if (snippet) {
          const isBot = snippet.id === client.user.id;

          //If the bot is mentioned in the first word, then ignore it!
          if (!(i == 0 && isBot)) {
            if (isBot) formatted_message += "'Gub Gub' ";
            else formatted_message += `'${snippet.globalName}' `;
          }
        } else {
          formatted_message += `${message} `;
        }
      });

      const response = await gptReply(
        formatted_message,
        message.author.globalName,
      );
      await message.reply(response);
    }

    if (message.author.bot) return;

    const gubbedAmount = wordCounter(message.content, "gub");

    if (gubbedAmount > 0) {
      const totalGubbedAmount =
        (await getCounter(message.author.id)) + gubbedAmount;

      await setCounter(message.author.id, totalGubbedAmount);

      message.reply(
        `${message.author.globalName} has gubbed ${totalGubbedAmount} times in total`,
      );
    }
  },
};
