import { gptReply } from "./gubgpt.js";
import { setCounter } from "./leaderboard.js";

let queue = [];

let processingQueue = false;

async function processQueue() {
  if (queue.length > 0) {
    const currentItem = queue[0];

    switch (currentItem.type) {
      case "gpt":
        await gptReply(currentItem);
        break;
      case "gub":
        await setCounter(currentItem);
        break;
    }

    queue.shift();
    await processQueue();
  } else {
    processingQueue = false;
    console.log("Finished Queue");
  }
}

export async function addToQueue(message) {
  queue.push(message);

  if (processingQueue == false) {
    console.log("Starting Queue");
    processingQueue = true;

    await processQueue();
  }
}
