const { Events } = require("discord.js");
const { setCounter, getCounter } = require("../leaderboard.js");
const { client } = require("../client.js");
const { gptReply } = require("../gubgpt.js");

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
      const response = await gptReply(
        message.content,
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
