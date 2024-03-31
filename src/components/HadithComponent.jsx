import React, { useState, useEffect } from 'react';
import '../styles/HadithComponent.css';

const HadithComponent = () => {
  const [hadith, setHadith] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchRandomHadith();
  }, []);

  const fetchRandomHadith = async () => {
    setIsLoading(true);
    try {
      // Dummy Hadiths
      const dummyHadiths = [
        {
          id: 1,
          text: "The best among you are those who have the best manners and character.",
          narrator: "Sahih Bukhari",
        },
        {
          id: 2,
          text: "The most perfect believer in faith is the one whose character is finest and who is kindest to his wife.",
          narrator: "Tirmidhi",
        },
        {
          id: 3,
          text: "Speak good or remain silent.",
          narrator: "Sahih Bukhari",
        }
      ];

      // Randomly select a Hadith
      const randomHadith = dummyHadiths[Math.floor(Math.random() * dummyHadiths.length)];
      
      // Set the fetched Hadith
      setHadith(randomHadith);
      setIsFavorite(favorites.some(item => item.id === randomHadith.id));
      setIsLoading(false);
      viewQuote({ ...randomHadith }); // View the newly fetched Hadith (clone to prevent reference sharing)
    } catch (error) {
      setError('Error fetching Hadith. Please try again later.');
      setIsLoading(false);
    }
  };

  const toggleFavorite = (quote) => {
    if (quote) {
      const isFavorited = favorites.some(item => item.id === quote.id);
      setIsFavorite(!isFavorited);
      if (isFavorited) {
        setFavorites(favorites.filter(item => item.id !== quote.id));
      } else {
        setFavorites([...favorites, { ...quote }]); // Clone to prevent reference sharing
      }
    }
  };

  const removeQuote = (quote) => {
    if (quote) {
      setRecentlyViewed(recentlyViewed.filter(item => item.id !== quote.id));
    }
  };

  const shareHadith = () => {
    // Implement sharing functionality here
  };

  const viewQuote = (quote) => {
    if (quote) {
      if (!recentlyViewed.some(item => item.id === quote.id)) {
        setRecentlyViewed([quote, ...recentlyViewed.slice(0, 3)]); // Limit to 3 recently viewed Hadiths
      }
    }
  };

  return (
    <div className="hadith-container">
      <div className="main-card hadith-card">
        <div className="hadith-header">
          <h1 className="hadith-title">Today's Hadith</h1>
          {hadith && (
            <div>
              <button className={`favorite-button ${isFavorite ? 'favorited' : ''}`} onClick={() => toggleFavorite(hadith)}>
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
              <button className="share-button" onClick={shareHadith}>
                Share
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
                <p className="hadith-reference">- {hadith.narrator}</p>
              </>
            ) : (
              <p className="no-hadith-message">Press 'Generate Hadith' to get a new Hadith.</p>
            )}
          </div>
        )}
        <button className="generate-button" onClick={fetchRandomHadith}>Generate Hadith</button>
      </div>

      <div className="side-cards">
        <div className="recent-hadiths">
          <h2>Recently Viewed</h2>
          {recentlyViewed.map((quote, index) => (
            <div key={index} className="hadith-card">
              <div className="hadith-card-content">
                <p className="hadith-text">{quote.text}</p>
                <p className="hadith-reference">- {quote.narrator}</p>
              </div>
              <button className="remove-button" onClick={() => removeQuote(quote)}>Remove</button>
              <button className="favorite-button" onClick={() => toggleFavorite(quote)}>
                {favorites.some(item => item.id === quote.id) ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
            </div>
          ))}
        </div>
        <div className="favorite-hadiths">
          <h2>Favorites</h2>
          {favorites.map((quote, index) => (
            <div key={index} className="hadith-card">
              <div className="hadith-card-content">
                <p className="hadith-text">{quote.text}</p>
                <p className="hadith-reference">- {quote.narrator}</p>
              </div>
              <button className="remove-button" onClick={() => removeQuote(quote)}>Remove</button>
              <button className="favorite-button" onClick={() => toggleFavorite(quote)}>
                {favorites.some(item => item.id === quote.id) ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HadithComponent;
