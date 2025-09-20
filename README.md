# Movie Search API

An API to search for movies using The Movie Database (TMDb).

## Requirements

- Node.js
- npm
- MongoDB
- TMDb API Key

## Installation

1. Clone the repository.
2. Install dependencies: `npm install`
3. Create a `.env` file with the following variables:
   - `PORT=3000`
   - `MONGODB_URI=mongodb://localhost:27017/movie-search`
   - `TMDB_API_KEY=YOUR_TMDB_API_KEY`
   - `JWT_SECRET=YOUR_JWT_SECRET`
4. Start the server: `npm start`

## API Endpoints

- `POST /api/users/register`: Register a new user.
- `POST /api/users/login`: Login and get a JWT token.
- `GET /api/movies/search?query=MOVIE_NAME`: Search for movies by name (requires authentication).
- `GET /api/movies/:id`: Get a movie by ID (requires authentication).

## Authentication

All movie search endpoints require authentication.  Include the JWT token in the `Authorization` header as a Bearer token.

Example:


Authorization: Bearer YOUR_JWT_TOKEN
