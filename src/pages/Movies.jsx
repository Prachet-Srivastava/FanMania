
import React, { useState } from 'react';
import axios from 'axios';
import { fetchMoviesByGenre, fetchTMDBReviews } from '../utils/api';
import './Movies.css'; // Import the CSS file here

const Movies = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');
  const [genre, setGenre] = useState('action'); // Default genre
  const [decade, setDecade] = useState('all'); // Default decade
  const [loading, setLoading] = useState(false); // Loading state
  const [reviews, setReviews] = useState([]); // State to store reviews
  const [showReviews, setShowReviews] = useState(false); // State to control review popup

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  const handleDecadeChange = (e) => {
    setDecade(e.target.value);
  };

  const filterByDecade = (movies) => {
    if (decade === 'all') return movies;

    const startYear = {
      '2010s': 2010,
      '2000s': 2000,
      '90s': 1990,
      '80s': 1980,
      'before80s': 1970,
    }[decade];

    return movies.filter((movie) => {
      const releaseYear = new Date(movie.release_date || movie.first_air_date).getFullYear();
      if (decade === 'before80s') {
        return releaseYear < 1980;
      }
      return releaseYear >= startYear && releaseYear < startYear + 10;
    });
  };

  const getCastDetails = async (tmdbId) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${tmdbId}/credits?api_key=63e61ac73f0504f8701391b26ef0f811`);
      const cast = response.data.cast.slice(0, 5).map(member => member.name); // Get top 5 cast members
      return cast.join(', ');
    } catch (error) {
      console.error('Error fetching cast details:', error);
      return 'N/A';
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setSearchResults([]);
    setLoading(true); // Start loading

    try {
      const userInput = e.target.elements.searchInput.value;

      // Search for movies by genre if no user input is provided
      if (!userInput) {
        const genreMovies = await fetchMoviesByGenre(genre);
        const filteredMovies = filterByDecade(genreMovies);

        const genreMovieCards = await Promise.all(filteredMovies.map(async (movie) => {
          const castDetails = await getCastDetails(movie.id); // Fetch cast details
          return createCard(movie.title, movie.overview, `https://image.tmdb.org/t/p/w500/${movie.poster_path}`, {
            cast: castDetails || 'N/A',
            imdb: `https://www.imdb.com/title/${movie.id}/`,
            'rotten tomatoes': getRottenTomatoesLink(movie.title),
            imdbRating: movie.vote_average,
            rottenTomatoesScore: 'N/A',
            tmdbId: movie.id, // Add TMDB ID here
          });
        }));

        setSearchResults(genreMovieCards);
        setLoading(false); // End loading
        return;
      }

      // Search for movies using TMDB API first
      const tmdbResponse = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=63e61ac73f0504f8701391b26ef0f811&query=${encodeURIComponent(userInput)}`);
      const tmdbMovies = tmdbResponse.data.results;

      const tmdbMovieCards = await Promise.all(tmdbMovies.map(async (movie) => {
        const castDetails = await getCastDetails(movie.id);
        return createCard(movie.title, movie.overview, `https://image.tmdb.org/t/p/w500/${movie.poster_path}`, {
          cast: castDetails || 'N/A',
          imdb: `https://www.imdb.com/title/${movie.id}/`,
          'rotten tomatoes': getRottenTomatoesLink(movie.title),
          imdbRating: movie.vote_average,
          rottenTomatoesScore: 'N/A',
          tmdbId: movie.id, // Add TMDB ID here
        });
      }));

      // Search for TV shows
      const tvShowsResponse = await axios.get(`https://api.tvmaze.com/search/shows?q=${userInput}`);
      const tvShows = tvShowsResponse.data;

      const tvShowCards = await Promise.all(tvShows.map(async (tvShow) => {
        try {
          const detailedResponse = await axios.get(`https://api.tvmaze.com/shows/${tvShow.show.id}`);
          const detailedTvShow = detailedResponse.data;
          const castResponse = await axios.get(`https://api.tvmaze.com/shows/${tvShow.show.id}/cast`);
          const cast = castResponse.data.map(actor => actor.person.name).join(', ');

          return createCard(tvShow.show.name, tvShow.show.summary, tvShow.show.image ? tvShow.show.image.medium : 'image.png', {
            cast: cast,
            imdb: detailedTvShow.externals.imdb ? `https://www.imdb.com/title/${detailedTvShow.externals.imdb}` : null,
            'rotten tomatoes': getRottenTomatoesLink(tvShow.show.name),
            imdbRating: detailedTvShow.rating.average,
            rottenTomatoesScore: 'N/A',
            tmdbId: null, // No TMDB ID for TV shows
          });
        } catch (error) {
          console.error('Error fetching TV show details:', error);
          return null;
        }
      }));

      // Search for movies using OMDB API
      const moviesResponse = await axios.get(`http://www.omdbapi.com/?s=${userInput}&apikey=603a67b0`);
      const movies = moviesResponse.data.Search;

      const movieCards = await Promise.all(movies.map(async (movie) => {
        try {
          const detailedResponse = await axios.get(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=603a67b0`);
          const detailedMovie = detailedResponse.data;

          // Fetch TMDB ID for the movie title if not already fetched from TMDB search
          let tmdbId = null;
          const tmdbMovie = tmdbMovies.find(m => m.title.toLowerCase() === detailedMovie.Title.toLowerCase());
          if (tmdbMovie) {
            tmdbId = tmdbMovie.id;
          } else {
            const tmdbSearchResponse = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=63e61ac73f0504f8701391b26ef0f811&query=${encodeURIComponent(detailedMovie.Title)}`);
            const tmdbMovieSearch = tmdbSearchResponse.data.results[0]; // Assume the first result is the correct movie
            if (tmdbMovieSearch) {
              tmdbId = tmdbMovieSearch.id;
            }
          }

          return createCard(detailedMovie.Title, detailedMovie.Plot, detailedMovie.Poster !== 'N/A' ? detailedMovie.Poster : 'image.png', {
            cast: detailedMovie.Actors,
            imdb: `https://www.imdb.com/title/${detailedMovie.imdbID}/`,
            'rotten tomatoes': getRottenTomatoesLink(detailedMovie.Title),
            imdbRating: detailedMovie.imdbRating,
            rottenTomatoesScore: 'N/A',
            tmdbId: tmdbId, // Use TMDB ID if available
          });
        } catch (error) {
          console.error('Error fetching movie details:', error);
          return null;
        }
      }));

      const allResults = [...tmdbMovieCards, ...tvShowCards, ...movieCards].filter(card => card !== null);
      const filteredResults = filterByDecade(allResults);

      setSearchResults(filteredResults);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching data. Please try again later.');
    } finally {
      setLoading(false); // End loading
    }
  };


  const handleReadReviews = async (tmdbId) => {
    if (!tmdbId) return;

    try {
      const reviews = await fetchTMDBReviews(tmdbId);
      setReviews(reviews.slice(0, 20)); // Get the first 20 reviews
      setShowReviews(true); // Show the popup
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const createCard = (title, description, imageUrl, externals) => {
    const generateYouTubeUrl = (title) => {
      const searchQuery = encodeURIComponent(`${title} official trailer`);
      return `https://www.youtube.com/results?search_query=${searchQuery}`;
    };

    return (
      <div className="search-result" style={{ marginBottom: '20px', marginTop: '20px', marginLeft: "5px" }} key={title}>
        <img src={imageUrl} alt={title} style={{ marginBottom: '5px', marginLeft: '10px' }} className="search-result-image" />
        <div className="search-result-content">
          <b><h1 style={{ color: '#E76F51', marginBottom: "5px", fontSize: "30px" }} className="search-result-title">{title}</h1></b>
          <p className="search-result-description" dangerouslySetInnerHTML={{ __html: description || 'No description available.' }}></p>
          <p className="search-result-cast"><strong><span style={{ color: '#E76F51', marginBottom: '5px' }}>Cast:</span> </strong> {externals.cast || 'N/A'}</p>
          {externals.imdb && <p className="search-result-rating"><strong></strong> <a href={externals.imdb} target="_blank" style={{ color: '#2A9D8F' }} rel="noopener noreferrer"><b>IMDb</b></a> - {externals.imdbRating || 'N/A'}</p>}
          <p className="search-result-rating"><strong></strong> <a href={externals['rotten tomatoes']} target="_blank" rel="noopener noreferrer"><b><span style={{ color: '#2A9D8F' }}>Rotten Tomatoes</span></b></a></p>
          <p className="search-result-trailer"><strong></strong> <a href={generateYouTubeUrl(title)} target="_blank" rel="noopener noreferrer"><b><span style={{ color: '#2A9D8F' }}>YouTube Trailer</span></b></a></p>
          {externals.tmdbId && <button onClick={() => handleReadReviews(externals.tmdbId)} style={{ backgroundColor: '#F4A261', color: 'white', padding: '8px 16px', borderRadius: '4px', border: 'none', marginBottom: '5px' }}>Read Reviews</button>}
        </div>
        <hr color="black" className="search-result-divider" />
      </div>
    );
  };

  const getRottenTomatoesLink = (title) => {
    return `https://www.rottentomatoes.com/search?search=${encodeURIComponent(title)}`;
  };

  const LoadingSpinner = () => (
    <div className="spinner">
      <div className="double-bounce1"></div>
      <div className="double-bounce2"></div>
    </div>
  );

  const ReviewPopup = () => (
    <div className="review-popup">
      <div className="review-popup-content">
        <button onClick={() => setShowReviews(false)} style={{ backgroundColor: '#E76F51', color: 'white', padding: '8px 16px', borderRadius: '4px', border: 'none', float: 'right' }}>Close</button>
        <h2 style={{ color: "#E76F51", marginBottom: '5px' }}><b>Reviews</b></h2>
        {reviews.length === 0 ? (
          <p>No reviews available.</p>
        ) : (
          reviews.map((review, index) => (
            <div key={index} className="review">
              <p style={{ color: "#2A9D8F" }}><strong>{review.author}</strong></p>
              <p>{review.content}</p>
              <hr color="black" className="search-result-divider" />
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="container">
      <h1 className="title"></h1>
      <form onSubmit={handleSearch} className="search-form">
        <input type="text" id="searchInput" placeholder="Enter a title" className="search-input"
          style={{
            backgroundColor: "white",
            width: "300px",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            marginRight: "10px",
            marginLeft: "5px"
          }} />
        <select value={genre} onChange={handleGenreChange} style={{ marginRight: '10px', backgroundColor: "#2A9D8F", padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
          <option value="action">Action</option>
          <option value="adventure">Adventure</option>
          <option value="drama">Drama</option>
          <option value="horror">Horror</option>
          <option value="comedy">Comedy</option>
        </select>
        <select value={decade} onChange={handleDecadeChange} style={{ marginRight: '10px', backgroundColor: "#2A9D8F", padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
          <option value="all">All</option>
          <option value="2010s">2010s</option>
          <option value="2000s">2000s</option>
          <option value="90s">90s</option>
          <option value="80s">80s</option>
          <option value="before80s">Before 80s</option>
        </select>
        <button type="submit" style={{ backgroundColor: '#F4A261', color: 'white', padding: '8px 16px', borderRadius: '4px', border: 'none' }}>Search</button>
      </form>
      {error && <p className="error">{error}</p>}
      <div className="results-container">
        {loading ? <LoadingSpinner /> : (searchResults.length === 0 ? <p></p> : searchResults)}
      </div>
      {showReviews && <ReviewPopup />}
    </div>
  );
};

export default Movies;
















