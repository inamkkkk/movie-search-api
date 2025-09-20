const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { ApiError } = require('../utils/ApiError');
const { asyncHandler } = require('../utils/asyncHandler');


const register = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        throw new ApiError(400, 'Username and password are required');
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        throw new ApiError(400, 'Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
});

const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        throw new ApiError(400, 'Username and password are required');
    }

    const user = await User.findOne({ username });
    if (!user) {
        throw new ApiError(401, 'Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw new ApiError(401, 'Invalid credentials');
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
});

module.exports = { register, login };