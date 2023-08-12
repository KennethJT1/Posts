const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Likes = sequelize.define("Likes");

module.exports = Likes;
