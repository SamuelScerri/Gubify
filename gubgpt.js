const { OpenAI } = require("openai");
const openai = new OpenAI();

let thread = null;
let messageQueue = [];
let processingQueue = false;

async function gptSync() {
  if (messageQueue.length > 0) {
    const currentMessage = messageQueue[0];

    console.log(`Processing: ${currentMessage}`);

    await currentMessage.interaction.channel.sendTyping();

    const response = await gptReply(
      currentMessage.message,
      currentMessage.name,
      currentMessage.attachments,
    );

    await currentMessage.interaction.reply(response);

    messageQueue.shift();

    await gptSync();
  } else {
    console.log("Done Processing");
    processingQueue = false;
  }
}

async function gptReply(message, name, attachments) {
  if (thread == null) {
    console.log("No thread found! Creating new thread");
    thread = await openai.beta.threads.create();
  }

  let content = [{ type: "text", text: `(user: ${name}) ${message}.` }];

  attachments.forEach((attached) => {
    content.push({
      type: "image_url",
      image_url: {
        url: attached.attachment,
      },
    });
  });

  const newMessage = await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: content,
  });

  let run = await openai.beta.threads.runs.createAndPoll(thread.id, {
    assistant_id: "asst_2xC7h3wvcLLxSxDVfLX206FB",
  });

  const messages = await openai.beta.threads.messages.list(run.thread_id);
  return messages.data[0].content[0].text.value;
}

module.exports = {
  addToQueue(message) {
    messageQueue.push(message);

    if (!processingQueue) {
      console.log("Begin Processing");

      processingQueue = true;
      gptSync();
    }
  },

  async gptReset() {
    console.log("Resetting thread");
    thread = await openai.beta.threads.create();
  },
};
