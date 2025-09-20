const jwt = require('jsonwebtoken');
require('dotenv').config();
const { ApiError } = require('../utils/ApiError');
const { asyncHandler } = require('../utils/asyncHandler');


const authenticate = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new ApiError(401, 'Authentication required');
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            throw new ApiError(401, 'Invalid token');
        }

        req.userId = decoded.userId;
        next();
    });
});

module.exports = { authenticate };