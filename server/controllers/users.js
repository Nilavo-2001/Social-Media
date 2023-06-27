const user = require("../models/User");
const handleServerError = require("../utils/serverError")

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const curUser = await user.findById(id).populate('friends'); // improve security
        curUser.password = '';
        res.status(200).json(curUser);
    } catch (error) {
        handleServerError(res, error, 404);
    }
}

const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const { friends } = await user.findById(id).populate('friends');
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );
        res.status(200).json(formattedFriends);

    } catch (error) {
        handleServerError(res, error, 404);
    }
}

const addRemoveFriends = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const curUser = await user.findById(id);
        const friend = await user.findById(friendId);
        let index1 = curUser.friends.indexOf(friendId);
        let index2 = friend.friends.indexOf(id);
        console.log(index1, index2);
        if (index1 >= 0 && index2 >= 0) {
            curUser.friends.splice(index1, 1);
            friend.friends.splice(index2, 1);
        } else {
            curUser.friends.push(friendId);
            friend.friends.push(id);
        }
        await curUser.save();
        await friend.save();
        let { friends } = await user.findById(id).populate('friends');
        await friend.populate('friends');
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );
        const friend_formattedFriends = friend.friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );
        res.status(200).json({ user: formattedFriends, friend: friend_formattedFriends });
    } catch (error) {
        handleServerError(res, error, 404);
    }
}

module.exports = { getUser, addRemoveFriends, getUserFriends };