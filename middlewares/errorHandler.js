const { ApiError } = require('../utils/ApiError');

const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors,
            stack: process.env.NODE_ENV === "development" ? err.stack : {}
        });
    }

    // Mongoose duplicate key error
    if (err.name === 'MongoServerError' && err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        return res.status(400).json({
            success: false,
            message: `Duplicate value for ${field}`,
            errors: err.errors,
            stack: process.env.NODE_ENV === "development" ? err.stack : {}
        });
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(val => val.message);
        return res.status(400).json({
            success: false,
            message: `Validation error: ${errors.join(', ')}`,
            errors: err.errors,
            stack: process.env.NODE_ENV === "development" ? err.stack : {}
        });
    }

    // JWT error handling
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            success: false,
            message: 'Invalid JWT token',
            errors: err.errors,
            stack: process.env.NODE_ENV === "development" ? err.stack : {}
        });
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            success: false,
            message: 'JWT token has expired',
            errors: err.errors,
            stack: process.env.NODE_ENV === "development" ? err.stack : {}
        });
    }


    console.error(err);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        errors: err.errors,
        stack: process.env.NODE_ENV === "development" ? err.stack : {}
    });
};

module.exports = { errorHandler };