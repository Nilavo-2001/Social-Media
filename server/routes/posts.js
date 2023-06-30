const express = require('express');
const { createPost, getFeedPosts, getUserPosts, delPost } = require('../controllers/posts');
const verifyToken = require('../middleware/verifyToken');
const upload = require('../config/multer');
const router = express.Router();
// Create
router.post('/', verifyToken, upload.single('picture'), createPost)

// Read
router.get('/', verifyToken, getFeedPosts)
router.get('/:userId/posts', verifyToken, getUserPosts)

//delete 
router.delete('/', verifyToken, delPost);

module.exports = router;