const axios = require('axios');
require('dotenv').config();
const { ApiError } = require('../utils/ApiError');
const { asyncHandler } = require('../utils/asyncHandler');


const searchMovies = asyncHandler(async (req, res) => {
    const { query } = req.query;
    if (!query) {
        throw new ApiError(400, 'Query parameter is required');
    }

    const apiKey = process.env.TMDB_API_KEY;
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;

    const response = await axios.get(apiUrl);
    res.json(response.data);
});

const getMovieById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const apiKey = process.env.TMDB_API_KEY;
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;

    const response = await axios.get(apiUrl);
    res.json(response.data);
});

module.exports = { searchMovies, getMovieById };