const express = require('express');
const Post = require('../models/Posts');
const router = express.Router();

router.get('/', async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
});

router.post('/', async (req, res) => {
    const newPost = new Post(req.body);
    await newPost.save();
    res.json(newPost);
});

router.post('/:id/like', async (req, res) => {
    await Post.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } });
    res.sendStatus(200);
});

router.post('/:id/comments', async (req, res) => {
    await Post.findByIdAndUpdate(req.params.id, { $push: { comments: req.body } });
    res.sendStatus(200);
});

module.exports = router;
