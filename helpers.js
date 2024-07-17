import { client } from "./client.js";

export function getUserFromMention(mention) {
  if (mention.startsWith("<@") && mention.endsWith(">")) {
    mention = mention.slice(2, -1);

    if (mention.startsWith("!")) {
      mention = mention.slice(1);
    }

    return client.users.cache.get(mention);
  } else return null;
}
export function wordCounter(word, test) {
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
