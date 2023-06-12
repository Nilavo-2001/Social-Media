const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const { toggleLike } = require('../controllers/likes');
const router = express.Router();
//toggleLike

router.patch('/:id', verifyToken, toggleLike);

module.exports = router;