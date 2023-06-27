const jwt = require('jsonwebtoken');
const user = require('../models/User');
const bcrypt = require('bcrypt');
const handleServerError = require('../utils/serverError');
const registerUser = async (req, res) => {
    try {
        console.log("Registering User ....");
        const { password } = req.body;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        console.log(req.file);
        const newUser = new user({
            ...req.body,
            password: passwordHash,
            picturePath: req.file.filename,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        });
        const savedUser = await newUser.save();
        console.log("User registered Sucessfully");
        return res.status(201).json(savedUser);

    } catch (error) {
        handleServerError(res, error, 500);
    }
}

const logInUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const curUser = await user.findOne({ email }).populate('friends');
        if (!curUser) {
            return res.status(400).json({ msg: "No user with this email" });
        }
        const isMatch = bcrypt.compare(password, curUser.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }
        const token = jwt.sign({ id: curUser._id }, process.env.JWT_SECRET);
        delete curUser.password;
        return res.status(200).json({ token, user: curUser });
    } catch (error) {
        handleServerError(res, error, 500);
    }
}


module.exports = { registerUser, logInUser }