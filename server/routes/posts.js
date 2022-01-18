// external imports
const express = require("express");
const router = express.Router();

// internal imports
const { getPosts, createPost } = require("../controllers/posts");

// GET POSTS
router.get("/", getPosts);
router.post("/", createPost);

module.exports = router;
