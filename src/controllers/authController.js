const User = require('../models/User');
const { hashPassword, comparePassword } = require('../utils/authUtils');
const { generateToken, verifyToken } = require('../config/jwt');
const { compare } = require('bcrypt');


const registerUser = async (req, res) => {
    try {
        const { username, password, role, name, lastname, email } = req.body;

        const hashedPassword = await hashPassword(password);

        const existingUserByUsername = await User.findOne({ username });
        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByUsername) {
            return res.status(400).json({ message: 'User already exists' });
        }
        if (existingUserByEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const newUser = new User({
            username,
            password: hashedPassword,
            role,
            name,
            lastname,
            email
        });
        await newUser.save();

        res.status(200).json({ message: ' User created successfully' });
    } catch (err) {
        console.log('Error registering user:', err);
        res.status(500).json({ message: 'An error occurred while registering the user.' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Verify if exist username in database
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid Credentials.' });
        }
        const token = generateToken({ username: user.username });
        res.status(200).json({
            message: 'Login successful',
            token
        });

    }
    catch (err) {
        console.error('Error in login:', err);
        res.status(500).json({ message: 'An error occurred while logining the user.' })
    }
}

module.exports = {
    registerUser,
    loginUser
}