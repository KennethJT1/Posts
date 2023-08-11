const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();

const app = express();

const db = require("./models");
const sequelize = require("./models/index");
const postRoute = require("./routes/Post");

app.use(express.json());
app.use(cors());
app.use("/posts", postRoute);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  console.log("Database connection established")
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
