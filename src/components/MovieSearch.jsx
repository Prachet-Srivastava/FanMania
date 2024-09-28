import React, { useState } from 'react';

const MovieSearch = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

//   return (
//     <form onSubmit={handleSubmit} style={{ marginLeft: '10px' }}>
//       <input
//         type="text"
//         placeholder="Search for a movie or TV show"
//         value={query}
//         onChange={handleInputChange}
//       />
//       <button type="submit">Search</button>
//     </form>
//   );
// };


return (
  <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
    {/* <input
      // type="text"
      // placeholder="Search for a movie or TV show"
      // value={query}
      // onChange={handleInputChange}
      // style={{ marginRight: '10px', width:"600px"}} // Add margin-right to the input field
    /> */}
    {/* <button type="submit">Search</button> */}
  </form>
);
}

export default MovieSearch;
