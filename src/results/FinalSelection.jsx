import React from 'react';

const FinalSelection = ({ selection }) => (
  <section>
    <h2>Your Group's Movie Choice</h2>
    <h3>{selection.title}</h3>
    <p><strong>Genre:</strong> {selection.genre}</p>
    <p><strong>Rating:</strong> {selection.rating}</p>
  </section>
);

export default FinalSelection;
