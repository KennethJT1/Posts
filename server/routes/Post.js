const express = require("express");
const router = express.Router();

const Posts = require("../models/Posts");
const { validateToken } = require("../middlewares/AuthMiddleware");
const Likes = require("../models/Likes");

router.get("/", validateToken, async (req, res) => {
  try {
    const listOfPosts = await Posts.findAll({ include: [Likes] });
    const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
    res.json({ listOfPosts: listOfPosts, likedPosts: likedPosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ Error: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Posts.findByPk(id);
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ Error: error });
  }
});

router.post("/", validateToken, async (req, res) => {
  try {
    const post = req.body;
    post.username = req.user.username;
    post.userId = req.user.id;
    const newPost = await Posts.create(post);
    return res.json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ Error: error });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const listOfPosts = await Posts.findAll({
      where: { userId },
      include: [Likes],
    });
    res.json(listOfPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ Error: error });
  }
});

router.put("/title", validateToken, async (req, res) => {
  try {
    const { newTitle, id } = req.body;
    await Posts.update({ title: newTitle }, { where: { id } });
    res.json(newTitle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ Error: error });
  }
});

router.put("/postText", validateToken, async (req, res) => {
  try {
    const { newText, id } = req.body;
    await Posts.update({ postText: newText }, { where: { id } });
    res.json(newText);
  } catch (error) {
    console.error(error);
    res.status(500).json({ Error: error });
  }
});

router.delete("/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    await Posts.destroy({
      where: {
        id: postId,
      },
    });

    res.json("POST DELETED SUCCESSFULLY");
  } catch (error) {
    console.error(error);
    res.status(500).json({ Error: error });
  }
});

module.exports = router;
