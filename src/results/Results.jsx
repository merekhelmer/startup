import React, { useState, useEffect } from 'react';
import FinalSelection from './FinalSelection';
import VoteSummary from './VoteSummary';
import './results.css';

const Results = ({ sessionCode }) => {
  const [finalSelection, setFinalSelection] = useState(null); // final movie
  const [votingResults, setVotingResults] = useState([]); // voting results
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`/api/results/${sessionCode}`);
        if (!response.ok) {
          throw new Error('Failed to fetch results.');
        }

        const data = await response.json();

        // movie with the highest votes is final selection
        if (data.length > 0) {
          const topMovie = data[0];
          setFinalSelection({
            title: `Movie ID: ${topMovie.movieId}`, // replace with actual movie info if available
            genre: "Unknown",
            rating: "Unknown",
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
