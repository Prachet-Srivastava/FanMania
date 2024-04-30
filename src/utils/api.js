// utils/api.js
export const fetchTVShows = async (query) => {
    try {
      const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching TV shows:', error);
      return [];
    }
  };
  
  // utils/api.js
export const fetchMovies = async (query) => {
    try {
      const response = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=603a67b0`);
      const data = await response.json();
      return data.Search;
    } catch (error) {
      console.error('Error fetching movies:', error);
      return [];
    }
  };
  