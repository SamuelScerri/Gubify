const { OpenAI } = require("openai");
const openai = new OpenAI();

let thread = null;

module.exports = {
  async gptReply(message, name) {
    if (thread == null) {
      console.log("No thread found! Creating new thread");
      thread = await openai.beta.threads.create();
    }

    const newMessage = await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: `(user: ${name}) ${message}.`,
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
