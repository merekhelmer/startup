import React, { useState, useEffect } from 'react';

const StatusDisplay = () => {
  const [status, setStatus] = useState([]);

  useEffect(() => {
    // Fetch status data here and update state
    // Example: setStatus(fetchedData);
  }, []);

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
