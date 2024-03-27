import React, { useState, useEffect } from 'react';
import '../styles/HadithComponent.css';

const HadithComponent = () => {
  const [hadith, setHadith] = useState(null);
  const [chapter, setChapter] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHadith();
  }, []);

  const fetchHadith = async () => {
    setIsLoading(true);
    try {
      // Fetch a random book slug
      const books = ['sahih-bukhari', 'sahih-muslim', 'al-tirmidhi', 'abu-dawood', 'ibn-e-majah', 'sunan-nasai', 'mishkat', 'musnad-ahmad', 'al-silsila-sahiha'];
      const randomBookSlug = books[Math.floor(Math.random() * books.length)];

      // Fetch the chapters of the selected book
      const chapterResponse = await fetch(`https://www.hadithapi.com/api/books/${randomBookSlug}?apiKey=$2y$10$LRtmSYoqezCWBRryl1i9eTeqlpyPqTNuhz6KyCVkB3ExvNlrCWiG`);
      const chapterData = await chapterResponse.json();
      const randomChapter = chapterData.chapters[Math.floor(Math.random() * chapterData.chapters.length)];

      // Fetch a random Hadith from the selected book and chapter
      const hadithResponse = await fetch(`https://www.hadithapi.com/api/hadiths/?apiKey=$2y$10$LRtmSYoqezCWBRryl1i9eTeqlpyPqTNuhz6KyCVkB3ExvNlrCWiG&book=${randomBookSlug}&chapter=${randomChapter.chapterNumber}`);
      const hadithData = await hadithResponse.json();
      const randomHadith = hadithData.hadiths[Math.floor(Math.random() * hadithData.hadiths.length)];

      setHadith(randomHadith);
      setChapter(randomChapter);
      setIsFavorite(false);
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
              {chapter && <p className="chapter-info">Chapter: {chapter.chapterNumber} - {chapter.chapterTitle}</p>}
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
