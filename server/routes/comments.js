const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const createComment = require('../controllers/comments')
const router = express.Router();

// add a comment to a post
router.post('/', verifyToken, createComment);

module.exports = router;