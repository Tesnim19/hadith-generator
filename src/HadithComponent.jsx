import React, { useState, useEffect } from 'react';
import './HadithComponent.css';

const HadithComponent = () => {
  const [hadith, setHadith] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHadith();
  }, []);

  const fetchHadith = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://api.example.com/hadith/random');
      const data = await response.json();
      setHadith(data);
      setIsFavorite(false); // Reset favorite status when new Hadith is fetched
      setIsLoading(false);
    } catch (error) {
      setError('Error fetching Hadith. Please try again later.');
      setIsLoading(false);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const shareHadith = () => {
    // Implement sharing functionality here
  };

  return (
    <div className="hadith-card">
      <div className="hadith-header">
        <h1 className="hadith-title">Today's Hadith</h1>
        {hadith && (
          <div>
            <button className={`favorite-button ${isFavorite ? 'favorited' : ''}`} onClick={toggleFavorite}>
              <i className={`fas fa-heart ${isFavorite ? 'favorited' : ''}`}></i>
            </button>
            <button className="share-button" onClick={shareHadith}>
              <i className="fas fa-share"></i>
            </button>
          </div>
        )}
      </div>
      {isLoading ? (
        <p className="loading-message">Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
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
      )}
      <button className="generate-button" onClick={fetchHadith}>Generate Hadith</button>
    </div>
  );
};

export default HadithComponent;
