const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const { getUser, getUserFriends, addRemoveFriends } = require('../controllers/users');
const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriends);
module.exports = router;