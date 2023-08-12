const express = require("express");
const router = express.Router();

const Likes = require("../models/Likes");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", validateToken, async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.user.id;

    const found = await Likes.findOne({
      where: { postId, userId },
    });
    if (!found) {
      await Likes.create({ postId, userId });
      res.json({ liked: true });
    } else {
      await Likes.destroy({
        where: { postId, userId },
      });
      res.json({ liked: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ Error: error });
  }
});

module.exports = router;
