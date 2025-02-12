require('dotenv').config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');

const { checkForAuthenticationCookie } = require("./middleware/authentication");



const userRouter = require('./routes/user');

const app = express();
const PORT = process.env.PORT;

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // Removed the credentials header to allow wildcard origin
    next();
});

// Database
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('MongoDB Connected');
}).catch(err => {
    console.error('MongoDB Connection Error:', err);
});
// Middleware
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use(checkForAuthenticationCookie('token'));

// Routes
app.use('/user', userRouter);


app.listen(PORT, () => {
    console.log(`Server Started at PORT:${PORT}`);
});
