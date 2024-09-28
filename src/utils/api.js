
import axios from 'axios';

const TMDB_API_KEY = '63e61ac73f0504f8701391b26ef0f811';
const OMDB_API_KEY = '603a67b0';
const YOUTUBE_API_KEY = 'AIzaSyANAR6uFjI9DS0DoJv3BnNeF-PnHJWJR_g';
const startingPage= Math.floor(Math.random() * 20) + 1;
const endingPage= Math.floor(Math.random() * 30) + 25;

export const fetchTVShows = async (query) => {
  try {
    const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching TV shows:', error);
    return [];
  }
};

export const fetchMovies = async (query) => {
  try {
    const response = await axios.get(`http://www.omdbapi.com/?s=${query}&apikey=${OMDB_API_KEY}`);
    return response.data.Search;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};

export const fetchTMDBMovies = async (query) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${query}`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching TMDB movies:', error);
    return [];
  }
};

export const fetchYouTubeTrailer = async (title) => {
  try {
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${encodeURIComponent(title)}%20trailer&key=${YOUTUBE_API_KEY}&part=snippet&type=video&maxResults=1`);
    if (response.data.items.length > 0) {
      const videoId = response.data.items[0].id.videoId;
      return `https://www.youtube.com/embed/${videoId}`;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching YouTube trailer:', error);
    return null;
  }
};

export const fetchMoviesByGenre = async (genre) => {
  try {
    const genreMap = {
      action: 28,
      adventure: 12,
      drama: 18,
      horror: 27,
      comedy: 35,
    };
    const genreId = genreMap[genre.toLowerCase()];
    const movies = [];

    for (let page = startingPage; page <= endingPage; page++) {
      const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&page=${page}`);
      movies.push(...response.data.results);
    }

    return movies;
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    return [];
  }
};


// Ensure this function is in api.js
export const fetchTMDBReviews = async (movieId) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${TMDB_API_KEY}`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching TMDB reviews:', error);
    return [];
  }
};






