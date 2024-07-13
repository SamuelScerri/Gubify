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

module.exports = {
  async setCounter(userId, counter) {
    await Users.update({ counter: counter }, { where: { id: userId } });
  },

  async getCounter(userId) {
    try {
      const user = await Users.findOne({ where: { id: userId } });
      return user.get("counter");
    } catch (error) {
      console.log("User doesn't exist, creating new user");

      user = await Users.create({
        id: userId,
        counter: 0,
      });

      return 0;
    }
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
