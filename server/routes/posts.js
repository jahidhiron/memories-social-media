// external imports
const express = require("express");
const router = express.Router();

// internal imports
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/posts");

// GET POSTS
router.get("/", getPosts);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

module.exports = router;
