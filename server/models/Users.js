const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Posts = require("./Posts");
const Likes = require("./Likes");

const Users = sequelize.define("Users", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Users.hasMany(
  Likes,
  { foreignKey: "userId" },
  {
    onDelete: "cascade",
  }
);

Users.hasMany(
  Posts,
  { foreignKey: "userId" },
  {
    onDelete: "cascade",
  }
);

module.exports = Users;
