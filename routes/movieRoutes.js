const express = require('express');
const movieController = require('../controllers/movieController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/search', authenticate, movieController.searchMovies);
router.get('/:id', authenticate, movieController.getMovieById);

module.exports = router;