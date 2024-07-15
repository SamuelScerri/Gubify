const Sequelize = require("sequelize");

const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  storage: "leaderboard.sqlite",
});

const Users = sequelize.define("users", {
  id: {
    type: Sequelize.STRING,
    unique: true,
    primaryKey: true,
  },
  counter: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
});

sequelize.sync();

async function getCounter(userId) {
  try {
    const user = await Users.findOne({ where: { id: userId } });
    return user.get("counter");
  } catch (error) {
    console.log("User doesn't exist, creating new user");

    await Users.create({
      id: userId,
      counter: 0,
    });

    return 0;
  }
}

module.exports = {
  async setCounter(message) {
    const totalGubbedAmount =
      (await getCounter(message.interaction.author.id)) + message.counter;

    await Users.update(
      { counter: totalGubbedAmount },
      { where: { id: message.interaction.author.id } },
    );
    await message.interaction.reply(
      `${message.interaction.author.globalName} has gubbed ${totalGubbedAmount} times in total`,
    );
  },

  async getAll() {
    const users = await Users.findAll({ attributes: ["id", "counter"] });
    return users
      .map((user) => ({
        id: user.dataValues.id,
        counter: user.dataValues.counter,
      }))
      .sort((a, b) => b.counter - a.counter);
  },
};

console.log("Initialized Leaderboard!");
