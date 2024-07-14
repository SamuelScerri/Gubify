const { OpenAI } = require("openai");
const openai = new OpenAI();

let thread = null;

module.exports = {
  async gptReset() {
    console.log("Resetting thread");
    thread = await openai.beta.threads.create();
  },

  async gptReply(message, name, attachments) {
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

    if (run.status === "completed") {
      const messages = await openai.beta.threads.messages.list(run.thread_id);
      return messages.data[0].content[0].text.value;
    }
  },
};
