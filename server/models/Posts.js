//  module.exports = (sequelize, DataTypes)=>{

//     const Posts = sequelize.define("Posts",{
//         title: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         postText: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         username: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//     })
//     return Posts;
//  }



const { DataTypes } = require("sequelize");
const sequelize = require("./index"); // Import your sequelize instance

const Posts = sequelize.define("Posts", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postText: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Posts;
