const express = require("express");
const router = express.Router();

const Posts = require("../models/Posts");

router.get("/", async (req, res) => {
  try {
    const posts = await Posts.findAll();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ Error: error });
  }
});

router.post("/", async (req, res) => {
  try {
    const post = req.body;
    const newPost = await Posts.create(post);
    return res.json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ Error: error });
  }
});

module.exports = router;
