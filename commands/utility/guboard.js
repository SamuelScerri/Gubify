const { SlashCommandBuilder } = require("discord.js");
const { client, getUserById } = require("../../client.js");
const { getAll } = require("../../leaderboard.js");

async function buildLeaderBoardText(users) {
  let leaderboardText = "";
  let rank = 1;

  for (const user of users) {
    const userInfo = await getUserById(user.id);
    leaderboardText += `#${rank} ${userInfo.globalName}: ${user.counter}\n`;
    rank++;
  }

  return leaderboardText;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("guboard")
    .setDescription("Get Gub leaderboard!"),
  async execute(interaction) {
    const users = await getAll();
    const leaderboardText = await buildLeaderBoardText(users);
    await interaction.reply(leaderboardText);
  },
};
