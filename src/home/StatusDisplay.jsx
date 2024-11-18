import React, { useState, useEffect } from 'react';

const StatusDisplay = ({ sessionCode }) => {
  const [status, setStatus] = useState([]);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(`/api/results/${sessionCode}`);
        if (response.ok) {
          const data = await response.json();
          setStatus(data);
        } else {
          console.error('Failed to fetch status');
        }
      } catch (error) {
        console.error('Error fetching status:', error);
      }
    };

    fetchStatus();
  }, [sessionCode]);

  return (
    <section>
      <h2>Group Status</h2>
      <ul>
        {status.map((item) => (
          <li key={item.movieId}>
            Movie ID: {item.movieId}, Votes: {item.votes}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default StatusDisplay;
