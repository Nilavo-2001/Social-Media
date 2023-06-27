const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/likes', require('./likes'));
router.use('/comments', require('./comments'));
module.exports = router;