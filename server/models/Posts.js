const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const Comments = require("./Comments");
const Likes = require("./Likes");

const Posts = sequelize.define("Posts", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  postText: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Posts.hasMany(
  Comments,
  { foreignKey: "postId" },
  {
    onDelete: "cascade",
  }
);
Posts.hasMany(
  Likes,
  { foreignKey: "postId" },
  {
    onDelete: "cascade",
  }
);

module.exports = Posts;
