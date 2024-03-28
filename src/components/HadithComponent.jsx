import React, { useState, useEffect } from 'react';
import '../styles/HadithComponent.css';

const HadithComponent = () => {
  const [hadith, setHadith] = useState(null);
  const [chapter, setChapter] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRandomHadith();
  }, []);

  const fetchRandomHadith = async () => {
    setIsLoading(true);
    try {
      // Fetch the list of books
      const booksResponse = await fetch('https://www.hadithapi.com/api/books?apiKey=$2y$10$LRtmSYoqezCWBRryl1i9eTeqlpyPqTNuhz6KyCVkB3ExvNlrCWiG');
      const booksData = await booksResponse.json();
  
     
      // Randomly select a book from the list
      const randomBook = booksData.books[Math.floor(Math.random() * booksData.books.length)];
      console.log(randomBook.bookName)
      // Fetch the chapters for the selected book
      const chaptersResponse = await fetch(`https://www.hadithapi.com/api/books/${randomBook.bookName}chapters/?apiKey=$2y$10$LRtmSYoqezCWBRryl1i9eTeqlpyPqTNuhz6KyCVkB3ExvNlrCWiG`);
      const chaptersData = await chaptersResponse.json();
      
      // Randomly select a chapter from the list
      const randomChapter = chaptersData.chapters[Math.floor(Math.random() * chaptersData.chapters.length)];
      
      // Fetch a random Hadith from the selected book and chapter
      const hadithResponse = await fetch(`https://www.hadithapi.com/api/hadiths?apiKey=$2y$10$LRtmSYoqezCWBRryl1i9eTeqlpyPqTNuhz6KyCVkB3ExvNlrCWiG&book=${randomBook.bookName}&chapter=${randomChapter.chapter_number}`);
      const hadithData = await hadithResponse.json();
      
      // Randomly select a Hadith from the list
      const randomHadith = hadithData[Math.floor(Math.random() * hadithData.length)];
      
      // Set the fetched Hadith and chapter
      setHadith(randomHadith);
      setChapter(randomChapter);
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
              <p className="chapter-info">Chapter: {chapter.name}</p>
            </>
          ) : (
            <p className="no-hadith-message">Press 'Generate Hadith' to get a new Hadith.</p>
          )}
        </div>
      )}
      <button className="generate-button" onClick={fetchRandomHadith}>Generate Hadith</button>
    </div>
  );
};

export default HadithComponent;
