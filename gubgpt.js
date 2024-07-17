import { OpenAI } from "openai";
const openai = new OpenAI();

let thread = null;

export async function gptDescribe(attachments) {
  if (attachments.length == 0) return "";

  let run = await openai.beta.threads.createAndRunPoll({
    assistant_id: "asst_P9BDKKhIoUW9M7vHY0NdkeS8",
    thread: {
      messages: [{ role: "user", content: attachments }],
    },
  });

  const messages = await openai.beta.threads.messages.list(run.thread_id);

  openai.beta.threads.del(run.thread_id);
  return messages.data[0].content[0].text.value;
}

export async function gptReply(message) {
  if (thread == null) {
    console.log("No thread found! Creating new thread");
    thread = await openai.beta.threads.create();
  }

  let attachments = [];

  message.attachments.forEach((attached) => {
    attachments.push({
      type: "image_url",
      image_url: {
        url: attached.attachment,
      },
    });
  });

  await message.interaction.channel.sendTyping();

  try {
    const attachmentDescription = await gptDescribe(attachments);

    const newMessage = await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: `(Image Description: ${attachmentDescription}) (User: ${message.name}) ${message.content}.`,
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
