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
    <div className="hadith-container">
      <h1 className="hadith-title">Today's Hadith</h1>
      {hadith ? (
        <div className="hadith-content">
          <p className="hadith-text">{hadith.text}</p>
          <p className="hadith-reference">- {hadith.reference}</p>
        </div>
      ) : (
        <p className="loading-message">Fetching Hadith...</p>
      )}
      <button className={`favorite-button ${isFavorite ? 'favorited' : ''}`} onClick={toggleFavorite}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
      <button className="generate-button" onClick={fetchHadith}>Generate</button>
    </div>
  );
};

export default HadithComponent;
