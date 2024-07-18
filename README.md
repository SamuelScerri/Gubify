# 👺 Gubify 👺

A Discord bot that acts like a goofy goblin named Gub Gub. [Click here to add it on your Discord server!](https://discord.com/oauth2/authorize?client_id=1261602764145033257&permissions=2048&integration_type=0&scope=bot)

[PFP obtained from this comic!](https://www.reddit.com/r/comics/comments/1d83owa/goblin_adventures_oc/)

![image](https://github.com/user-attachments/assets/0798b377-b1a0-4dbc-9111-b4b60faab788)

# Goofing off with Gub Gub:
Tag Gub Gub to chat with him!

![image](https://github.com/user-attachments/assets/4302c197-5706-4d44-9d95-6566312d0dad)

Gubotamize him to reset the conversation!

![image](https://github.com/user-attachments/assets/49cf9c2c-271a-482f-aba3-fd67f70687a7)

Use Gubify to append something to every word in your message!

![image](https://github.com/user-attachments/assets/0da43c36-c5e0-42e3-b033-e010b1ffc145)

Check out the leaderboard to see who gubbed the most!

![image](https://github.com/user-attachments/assets/308fd267-6052-403e-8a29-994f88847f9d)

# Notes:

**VERY IMPORTANT**: Currently the chat conversation and leaderboard is shared between ALL discord servers, this will be fixed as soon as possible! So don't write any private info, oke doke?

Earlier versions used GPT 4o for both chatting and image detection, which was quite expensive to run. Therefore GPT 4o is only used for image detection and GPT 3.5 is used for chatting,
it's not super difficult to make it run completely on GPT 4o, check out `gubgpt.js` and mess around in it. A seperate branch will be created later which will use GPT 4o only.

# How To Run Locally:

I'm going to assume you are familiar discord.js and the Discord developer portal, if not [start here!](https://discordjs.guide)

Create a `.env` file in the root directory and fill it with:

```
TOKEN=OBTAIN_TOKEN_FROM_DISCORD_DEVELOPER_PORTAL
CLIENT_ID=OBTAIN_CLIENT_ID_FROM_DISCORD_DEVELOPER_PORTAL
OPENAI_API_KEY=OBTAIN_OPENAI_KEY_FROM_OPENAI_PROJECT_DASHBOARD
```

You will then have to create two assistants running:
- GPT 4o for image detection
- GPT 3.5 Turbo 0125 for chatting (go ham, describe your own goofy goblin!)

Then replace line 10 and 15 in `gubgpt.js` with the respective newly created assistant IDs (will be changed later)

Then it's as simple as running:

```
npm install
node --env-file=.env .
```

Ta-da! A... goblin thing!
