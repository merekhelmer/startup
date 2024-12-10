// Results.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Results = () => {
  const location = useLocation();
  const sessionCode = location.state?.sessionCode;
  const [results, setResults] = useState([]);
  const [winningMovie, setWinningMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState({});

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`/api/results/${sessionCode}`);
        const data = await response.json();
        setResults(data.results);

        // fetch details for each movie
        const details = {};
        for (const result of data.results) {
          const movieId = result.movieId;
          const movieDetailsResponse = await fetch(
            `http://www.omdbapi.com/?apikey=cf0fa3b1&i=${movieId}`
          );
          const movieDetails = await movieDetailsResponse.json();
          details[movieId] = movieDetails;
        }
        setMovieDetails(details);

        // movie with the highest votes
        if (data.results && data.results.length > 0) {
          const topMovieId = data.results[0].movieId;
          setWinningMovie(details[topMovieId]);
        }
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();
  }, [sessionCode]);

  return (
    <section>
      <div id="final-selection">
        <h2>Your Group's Movie Choice</h2>
        {winningMovie ? (
          <div>
            <h3>{winningMovie.Title}</h3>
            <img src={winningMovie.Poster} alt={winningMovie.Title} />
          </div>
        ) : (
          <p>Loading winning movie details...</p>
        )}
      </div>
      <h3>All Voting Results:</h3>
      <ul id="vote-results">
        {results.map((result) => {
          const movie = movieDetails[result.movieId];
          return (
            <li key={result.movieId}>
              {movie ? (
                <div>
                  <h4>{movie.Title}</h4>
                  <p><strong>Votes:</strong> {result.votes}</p>
                </div>
              ) : (
                <p>Loading movie details...</p>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Results;


// // Results.jsx
// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';

// const Results = () => {
//   const location = useLocation();
//   const sessionCode = location.state?.sessionCode;
//   const [results, setResults] = useState([]);
//   const [winningMovie, setWinningMovie] = useState(null);

//   useEffect(() => {
//     const fetchResults = async () => {
//       try {
//         const response = await fetch(`/api/results/${sessionCode}`);
//         const data = await response.json();
//         setResults(data.results);

//         // Get the movie with the highest votes
//         if (data.results && data.results.length > 0) {
//           const topMovieId = data.results[0].movieId;
//           const movieDetailsResponse = await fetch(
//             `http://www.omdbapi.com/?apikey=cf0fa3b1&i=${topMovieId}`
//           );
//           const movieDetails = await movieDetailsResponse.json();
//           setWinningMovie(movieDetails);
//         }
//       } catch (error) {
//         console.error('Error fetching results:', error);
//       }
//     };

//     fetchResults();
//   }, [sessionCode]);

//   return (
//     <section>
//       <h2>Voting Results</h2>
//       {winningMovie ? (
//         <div>
//           <h3>Your Group's Movie Choice: {winningMovie.Title}</h3>
//           <p><strong>Genre:</strong> {winningMovie.Genre}</p>
//           <p><strong>Rating:</strong> {winningMovie.imdbRating}</p>
//           <p><strong>Plot:</strong> {winningMovie.Plot}</p>
//           {/* Display more details if needed */}
//         </div>
//       ) : (
//         <p>Loading winning movie details...</p>
//       )}
//       <h3>All Voting Results:</h3>
//       <ul>
//         {results.map((result) => (
//           <li key={result.movieId}>
//             Movie ID: {result.movieId} - {result.votes} votes
//           </li>
//         ))}
//       </ul>
//     </section>
//   );
// };

// export default Results;