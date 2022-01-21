const mongoose = require("mongoose");

const PostMessage = require("../models/postMessage");

const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);

  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).json({ message: "No post with that id" });
    }

    const post = {
      creator,
      title,
      message,
      tags,
      selectedFile,
      _id,
    };
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).json({ message: "No post with that id" });
    }

    await PostMessage.findByIdAndRemove(_id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const likePost = async (req, res) => {
  const { id: _id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).json({ message: "No post with that id" });
    }
    const post = await PostMessage.findById(_id);
    const updatedPost = await PostMessage.findByIdAndUpdate(
      _id,
      { likeCount: post.likeCount + 1 },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

module.exports = { getPosts, createPost, updatePost, deletePost, likePost };
