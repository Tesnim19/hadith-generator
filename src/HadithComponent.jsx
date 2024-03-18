import React, { useState, useEffect } from 'react';
import './HadithComponent.css';

const HadithComponent = () => {
  const [hadith, setHadith] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchHadith();
  }, []);

  const fetchHadith = async () => {
    try {
      const response = await fetch('https://api.example.com/hadith/random');
      const data = await response.json();
      setHadith(data);
      // Reset favorite status when new Hadith is fetched
      setIsFavorite(false);
    } catch (error) {
      console.error('Error fetching Hadith:', error);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="hadith-card">
      <div className="hadith-header">
        <h1 className="hadith-title">Today's Hadith</h1>
        {hadith && (
          <button className={`favorite-button ${isFavorite ? 'favorited' : ''}`} onClick={toggleFavorite}>
            <i className={`fas fa-heart ${isFavorite ? 'favorited' : ''}`}></i>
          </button>
        )}
      </div>
      <div className="hadith-content">
        {hadith ? (
          <>
            <p className="hadith-text">{hadith.text}</p>
            <p className="hadith-reference">- {hadith.reference}</p>
          </>
        ) : (
          <p className="no-hadith-message">Press 'Generate Hadith' to get a new Hadith.</p>
        )}
      </div>
      <button className="generate-button" onClick={fetchHadith}>Generate Hadith</button>
    </div>
  );
};

export default HadithComponent;
