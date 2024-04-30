
import React, { useState } from 'react';
import MovieSearch from '../components/MovieSearch';
import { fetchTVShows, fetchMovies } from '../utils/api';
import axios from 'axios';

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setSearchResults([]);

    try {
      const userInput = e.target.elements.searchInput.value;

      // Search for TV shows
      const tvShowsResponse = await axios.get(`https://api.tvmaze.com/search/shows?q=${userInput}`);
      const tvShows = tvShowsResponse.data;

      if (tvShows && tvShows.length > 0) {
        const tvShowCards = tvShows.map((tvShow) => {
          return createCard(tvShow.show.name, tvShow.show.summary, tvShow.show.image ? tvShow.show.image.medium : 'image.png', tvShow.show.externals);
        });
        setSearchResults((prevResults) => [...prevResults, ...tvShowCards]);
      } else {
        setSearchResults((prevResults) => [...prevResults, <p key="noTvShows">No TV shows found.</p>]);
      }

      // Search for movies
      const moviesResponse = await axios.get(`http://www.omdbapi.com/?s=${userInput}&apikey=603a67b0`);
      const movies = moviesResponse.data.Search;

      if (movies && movies.length > 0) {
        const movieCards = [];
        for (const movie of movies) {
          const detailedResponse = await axios.get(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=603a67b0`);
          const detailedMovie = detailedResponse.data;

          movieCards.push(createCard(detailedMovie.Title, detailedMovie.Plot, detailedMovie.Poster !== 'N/A' ? detailedMovie.Poster : 'image.png', {
            imdb: `https://www.imdb.com/title/${detailedMovie.imdbID}/`,
            'rotten tomatoes': getRottenTomatoesLink(detailedMovie.Title)
          }));
        }
        setSearchResults((prevResults) => [...prevResults, ...movieCards]);
      } else {
        setSearchResults((prevResults) => [...prevResults, <p key="noMovies">No movies found.</p>]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching data. Please try again later.');
    }
  };

  const createCard = (title, description, imageUrl, externals) => {
    return (
      <div className="search-result" key={title}>
        <img src={imageUrl} alt={title} className="search-result-image" />
        <div className="search-result-content">
          <h2 className="search-result-title">{title}</h2>
          {/* <p className="search-result-description">{description || 'No description available.'}</p> */}
          <p className="search-result-description" dangerouslySetInnerHTML={{ __html: description || 'No description available.' }}></p>
          {externals && (
            <div className="search-result-links">
              {externals.imdb && <a href={externals.imdb} target="_blank" rel="noopener noreferrer">IMDb</a>}
              {externals['rotten tomatoes'] && <a href={externals['rotten tomatoes']} target="_blank" rel="noopener noreferrer">Rotten Tomatoes</a>}
            </div>
          )}
        </div>
        <hr className="search-result-divider" />
      </div>
    );
  };

  const getRottenTomatoesLink = (title) => {
    return `https://www.rottentomatoes.com/search?search=${encodeURIComponent(title)}`;
  };

  return (
    <div className="container">
      <h1 className="title">Search Movies and TV Shows</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input type="text" id="searchInput" placeholder="Search for a movie or TV show" className="search-input" />
        <button type="submit" className="search-button">Search</button>
      </form>
      {error && <p className="error">{error}</p>}
      <div className="results-container">
        {searchResults}
      </div>
    </div>
  );
};

export default Movies;
