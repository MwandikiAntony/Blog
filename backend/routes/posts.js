const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

// Create a new post
router.post('/', async (req, res) => {
  const { title, content } = req.body;

  // Validate input
  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  const post = new Post({ title, content });

  try {
    await post.save(); // Save the post to the database
    res.status(201).json(post); // Respond with the created post
  } catch (err) {
    res.status(500).json({ error: err.message }); // Internal server error
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find(); // Fetch all posts from the database
    res.status(200).json(posts); // Respond with the posts
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle any errors during fetching
  }
});

module.exports = router;
