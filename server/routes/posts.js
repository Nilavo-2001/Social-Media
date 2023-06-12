const express = require('express');
const { createPost, getFeedPosts, getUserPosts } = require('../controllers/posts');
const verifyToken = require('../middleware/verifyToken');
const upload = require('../config/multer');
const router = express.Router();
// Create
router.post('/', verifyToken, upload.single('picture'), createPost)

// Read
router.get('/', verifyToken, getFeedPosts)
router.get('/:userId/posts', verifyToken, getUserPosts)

module.exports = router;