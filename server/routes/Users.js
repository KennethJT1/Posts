const express = require("express");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const router = express.Router();

const Users = require("../models/Users");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
      Users.create({
        username: username,
        password: hash,
      });
      res.json("SUCCESSFULLY REGISTERED");
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ Error: error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Users.findOne({ where: { username } });

    if (!user) res.json({ error: "User Doesn't Exist" });

    bcrypt.compare(password, user.password).then(async (match) => {
      if (!match)
        res.json({ error: "Wrong Username And Password Combination" });

      const accessToken = sign(
        { username: user.username, id: user.id },
        process.env.JWT_SECRET
      );
      res.json({ token: accessToken, username: username, id: user.id });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ Error: error });
  }
});

router.get("/auth", validateToken, async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ Error: error });
  }
});

router.get("/basicinfo/:id", validateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const basicInfo = await Users.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    res.json(basicInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ Error: error });
  }
});

router.put("/changepassword", validateToken, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await Users.findOne({
      where: { username: req.user.username },
    });

    bcrypt.compare(oldPassword, user.password).then(async (match) => {
      if (!match) res.json({ error: "Wrong Password Entered!" });

      bcrypt.hash(newPassword, 10).then((hash) => {
        Users.update(
          { password: hash },
          { where: { username: req.user.username } }
        );
        res.json("SUCCESSFULLY CHANGED PASSWORD");
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ Error: error });
  }
});

module.exports = router;
