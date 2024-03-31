import React, { useState, useEffect } from 'react';
import '../styles/HadithComponent.css';

const dummyHadiths = [
  {
    id: 1,
    text: "The best of you are those who learn the Quran and teach it to others.",
    reference: "Sahih Bukhari"
  },
  {
    id: 2,
    text: "Do not be people without minds of your own, saying that if others treat you well you will treat them well, and that if they do wrong you will do wrong. Instead, accustom yourselves to do good if people do good and not to do wrong if they do evil.",
    reference: "Sunan At-Tirmidhi"
  },
  {
    id: 3,
    text: "The strong person is not the one who can wrestle someone else down. The strong person is the one who can control himself when he is angry.",
    reference: "Sahih al-Bukhari"
  },
  {
    id: 4,
    text: "Kindness is a mark of faith, and whoever has not kindness has not faith.",
    reference: "Sahih Muslim"
  },
  {
    id: 5,
    text: "A person will not be a believer until his heart becomes obedient to Allah.",
    reference: "Musnad Ahmad"
  }
];

const HadithComponent = () => {
  const [hadith, setHadith] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentHadiths, setRecentHadiths] = useState([]);

  useEffect(() => {
    fetchRandomHadith();
  }, []);

  const fetchRandomHadith = () => {
    setIsLoading(true);
    try {
      const randomIndex = Math.floor(Math.random() * dummyHadiths.length);
      const randomHadith = dummyHadiths[randomIndex];
      setHadith(randomHadith);
      setIsFavorite(false);
      setIsLoading(false);
      
      // Add the current Hadith to the list of recent Hadiths
      setRecentHadiths(prevHadiths => [randomHadith, ...prevHadiths]);
    } catch (error) {
      setError('Error fetching Hadith. Please try again later.');
      setIsLoading(false);
    }
  };

  const toggleFavorite = (id) => {
    const updatedHadiths = recentHadiths.map(hadith => {
      if (hadith.id === id) {
        return { ...hadith, isFavorite: !hadith.isFavorite };
      }
      return hadith;
    });
    setRecentHadiths(updatedHadiths);
  };

  const removeHadith = (id) => {
    const filteredHadiths = recentHadiths.filter(hadith => hadith.id !== id);
    setRecentHadiths(filteredHadiths);
  };

  return (
    <div className="hadith-container">
      <div className="hadith-card">
        <div className="hadith-header">
          <h1 className="hadith-title">Today's Hadith</h1>
          {hadith && (
            <div>
              <button className={`favorite-button ${isFavorite ? 'favorited' : ''}`} onClick={() => setIsFavorite(!isFavorite)}>
                <i className={`fas fa-heart ${isFavorite ? 'favorited' : ''}`}></i>
              </button>
            </div>
          )}
        </div>
        {isLoading ? (
          <p className="loading-message">Loading...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : hadith ? (
          <div className="hadith-content">
            <>
              <p className="hadith-text">{hadith.text}</p>
              <p className="hadith-reference">- {hadith.reference}</p>
            </>
          </div>
        ) : (
          <p className="no-hadith-message">Press 'Generate Hadith' to get a new Hadith.</p>
        )}
        <button className="generate-button" onClick={fetchRandomHadith}>Generate Hadith</button>
      </div>
      <div className="recent-hadiths">
        <h2>Recently Viewed Hadiths</h2>
        <ul>
          {recentHadiths.map((hadith, index) => (
            <li key={hadith.id}>
              <div className="recent-hadith-content">
                <div className="recent-hadith-header">
                  <button className={`favorite-button ${hadith.isFavorite ? 'favorited' : ''}`} onClick={() => toggleFavorite(hadith.id)}>
                    <i className={`fas fa-heart ${hadith.isFavorite ? 'favorited' : ''}`}></i>
                  </button>
                  <button className="remove-button" onClick={() => removeHadith(hadith.id)}>
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                <p className="recent-hadith-text">{hadith.text}</p>
                <p className="recent-hadith-reference">- {hadith.reference}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HadithComponent;
