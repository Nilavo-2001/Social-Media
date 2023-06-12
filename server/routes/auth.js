const express = require('express');
const router = express.Router();
const { registerUser, logInUser } = require('../controllers/auth.js');
const upload = require('../config/multer');
const verifyToken = require('../middleware/verifyToken');
router.post('/register', upload.single("picture"), registerUser);
router.post('/login', logInUser);

module.exports = router