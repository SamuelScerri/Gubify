import { SlashCommandBuilder } from "discord.js";
import { client, getUserById } from "../../client.js";
import { getAll } from "../../leaderboard.js";

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

export const data = new SlashCommandBuilder()
  .setName("guboard")
  .setDescription("Get Gub leaderboard!");
export async function execute(interaction) {
  const users = await getAll();
  const leaderboardText = await buildLeaderBoardText(users);
  await interaction.reply(leaderboardText);
}
