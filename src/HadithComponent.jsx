import React, { useState } from 'react';
import './HadithComponent.css'; // Import CSS file for styling

const HadithComponent = () => {
  // State to store the fetched Hadith
  const [hadith, setHadith] = useState(null);

  // Function to fetch a random Hadith
  const fetchHadith = async () => {
    try {
      // Make an API call to fetch the Hadith
      const response = await fetch('https://api.example.com/random-hadith');
      const data = await response.json();

      // Update the state with the fetched Hadith
      setHadith(data);
    } catch (error) {
      console.error('Error fetching Hadith:', error);
    }
  };

  return (
    <div className="hadith-container">
      <h1 className="title">Today's Hadith</h1>
      {/* Conditionally render the Hadith content */}
      {hadith ? (
        <div className="hadith-content">
          <p className="hadith-text">{hadith.text}</p>
          <p className="hadith-explanation">Explanation: {hadith.explanation}</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p className="placeholder">Click the button to generate a Hadith</p>
      )}
      {/* Button to generate a new Hadith */}
      <button className="generate-button" onClick={fetchHadith}>Generate</button>
    </div>
  );
};

export default HadithComponent;
