import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FinalSelection from './FinalSelection';
import VoteSummary from './VoteSummary';
import './results.css';

const Results = () => {
  const location = useLocation();
  const sessionCode = location.state?.sessionCode;

  const [finalSelection, setFinalSelection] = useState(null);
  const [votingResults, setVotingResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!sessionCode) {
        setError('Session code is missing.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/results/${sessionCode}`);
        if (!response.ok) {
          throw new Error('Failed to fetch results.');
        }

        const data = await response.json();

        // movie with the highest votes as final selection
        if (data.length > 0) {
          const topMovie = data[0];
          setFinalSelection({
            title: `Movie ID: ${topMovie.movieId}`, // placeholder for real movie data
            genre: 'Unknown',
            rating: 'Unknown',
          });
        }
        setVotingResults(data);
      } catch (err) {
        console.error('Error fetching results:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [sessionCode]);

  if (loading) {
    return <p>Loading results...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <main>
      {finalSelection && <FinalSelection selection={finalSelection} />}
      <VoteSummary results={votingResults} />
    </main>
  );
};

export default Results;