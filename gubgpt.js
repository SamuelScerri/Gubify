import { OpenAI } from "openai";
const openai = new OpenAI();

let thread = null;

export async function gptReply(message) {
  if (thread == null) {
    console.log("No thread found! Creating new thread");
    thread = await openai.beta.threads.create();
  }

  let content = [
    { type: "text", text: `(user: ${message.name}) ${message.content}` },
  ];

  message.attachments.forEach((attached) => {
    content.push({
      type: "image_url",
      image_url: {
        url: attached.attachment,
      },
    });
  });

  await message.interaction.channel.sendTyping();

  try {
    const newMessage = await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: content,
    });

    let run = await openai.beta.threads.runs.createAndPoll(thread.id, {
      assistant_id: "asst_2xC7h3wvcLLxSxDVfLX206FB",
    });

    const messages = await openai.beta.threads.messages.list(run.thread_id);
    await message.interaction.reply(messages.data[0].content[0].text.value);
  } catch (error) {
    console.error(error);

    await message.interaction.reply(
      "WARNING: GUB GUB SIMULATION DETECTED FOREIGN CONTENT, PLEASE TRY AGAIN",
    );
  }
}

export async function gptReset() {
  console.log("Resetting thread");
  thread = await openai.beta.threads.create();
}
