const express = require("express");
const router = express.Router();

const Comments = require("../models/Comments");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const comment = await Comments.findAll({ where: { postId } });
    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ Error: error });
  }
});

router.post("/", validateToken, async (req, res) => {
  try {
    const comment = req.body;
    const username = req.user.username;
    comment.username = username;
    const newComment = await Comments.create(comment);
    return res.json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ Error: error });
  }
});

router.delete("/:commentId", validateToken, async (req, res) => {
  try {
    const { commentId } = req.params;

    await Comments.destroy({
      where: {
        id: commentId,
      },
    });

    res.json("COMMENT DELETED SUCCESSFULLY");
  } catch (error) {
    console.error(error);
    res.status(500).json({ Error: error });
  }
});

module.exports = router;
