const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();

const app = express();

const sequelize = require("./models/index");
const postRoute = require("./routes/Post");
const commentRoute = require("./routes/Comment");
const likeRoute = require("./routes/Likes");
const userRoute = require("./routes/Users");

app.use(express.json());
app.use(cors());
app.use("/posts", postRoute);
app.use("/comments", commentRoute);
app.use("/likes", likeRoute);
app.use("/auth", userRoute);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  console.log("Database connection established")
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
