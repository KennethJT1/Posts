const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Comments = sequelize.define("Comments", {
  commentBody: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


module.exports = Comments;
