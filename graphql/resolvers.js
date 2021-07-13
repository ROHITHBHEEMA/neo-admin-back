const validator = require('validator');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

module.exports = {
    login: async function({ username, password }) {
        console.log(username)
        console.log(await User.find())
        const user = await User.findOne({ username: username });
        if (!user) {
            const error = new Error('User not found.');
            error.code = 401;
            throw error;
        }
        if (user.password !== password) {
            const error = new Error('Password is incorrect.');
            error.code = 401;
            throw error;
        }
        const token = jwt.sign(
            {
                userId: user._id.toString(),
                username: user.username
            },
            'somesupersecretsecret',
            { expiresIn: '1h' }
        );
        return { token: token, userId: user._id.toString() };
    }
};
