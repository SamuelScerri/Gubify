const { OpenAI } = require("openai");
const openai = new OpenAI();

module.exports = {
  async gptReply(message) {
    const thread = await openai.beta.threads.create();

    const newMessage = await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: message,
    });

    let run = await openai.beta.threads.runs.createAndPoll(thread.id, {
      assistant_id: "asst_2xC7h3wvcLLxSxDVfLX206FB",
    });

    if (run.status === "completed") {
      const messages = await openai.beta.threads.messages.list(run.thread_id);
      let response = "";

      for (const message of messages.data.reverse()) {
        if (message.role === "assistant")
          response += `${message.content[0].text.value}\n`;
      }

      return response;
    }
  },
};
