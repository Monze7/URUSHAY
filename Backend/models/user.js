const { createHmac, randomBytes } = require("node:crypto");
const { Schema, model } = require('mongoose');
const { createTokenForUser, validateToken } = require('../services/authentication'); 

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobileNumber: {
        type: Number,
        required: true,
    },
    dob: {
        type: Date,
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required : true,
    },
}, { timestamps: true });

userSchema.pre("save", function(next) {
    const user = this;
    if (!user.isModified("password")) return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256', salt).update(user.password).digest('hex');

    user.salt = salt;
    user.password = hashedPassword;

    next();
});

userSchema.statics.matchPasswordAndGenerateToken = async function(email, password) {
    const user = await this.findOne({ email });
    if (!user) {
        throw new Error('User Not Found');
    }

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = createHmac('sha256', salt).update(password).digest('hex');

    if (hashedPassword !== userProvidedHash) {
        throw new Error('Incorrect Password');
    }

    const token = createTokenForUser(user);
    return token;
};

// Add the getUserByEmail method to the userSchema
userSchema.statics.getUserByEmail = async function(email) {
    const user = await this.findOne({ email });
    if (!user) {
        throw new Error('Unable to find user');
    }
    return user;
};

const User = model('user', userSchema);

module.exports = User;