const express = require("express");
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const User = require('../models/user');



const router = express.Router();
router.use(express.json());
router.use(cors());
router.use(cookieParser());


const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.token || req.cookies.token;
        console.log('Token:', token);
        const decoded = jwt.verify(token, '$uperman@123');
        console.log('Decoded:', decoded);

        const user = await User.findById(decoded._id).catch(err => console.error(err));
        console.log('User:', user);

        if (!user) {
            throw new Error();
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

router.post('/signup', async (req, res) => {
    const { firstName, lastName, email, aadharNumber, mobileNumber,dob, password } = req.body;
    try {
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            aadharNumber,
            mobileNumber,
            dob,
            password,
        });
        return res.status(201).json({ msg: "success", user: newUser._id, token: req.cookies.token });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password);
        const user = await User.getUserByEmail(email);

        return res.cookie("token", token).status(201).json({ msg: "success", token, user });
    } catch (error) {
        console.error(error);
        return res.status(301).json({
            error: "Incorrect Email or Password",
        });
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie("token").redirect("/signin");
});

module.exports = router;