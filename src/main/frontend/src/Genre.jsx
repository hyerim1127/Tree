import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import personLight from './img/person-light.png';
import logoutLight from './img/logout-light.png';
import pencilLight from './img/pencil-light.png';
import treeLight from './img/tree-light.png';
import bmkGreen from './img/bookmark-green.png';
import ModalGenre from './genreSelectModal/ModalGenre';
import ModalImpressionReason from './ModalImpressionReason';
import "./genre.css";

const Genre = () => {
  const [showModalGenre, setShowModalGenre] = useState(false);
  const [showModalImpression, setShowModalImpression] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [relatedImpressions, setRelatedImpressions] = useState([]);
  const [impressions, setImpressions] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const selectedGenre = params.get('genre');

  useEffect(() => {
    if (selectedGenre) {
      axios.get(`http://localhost:8081/board/genre?genre=${selectedGenre}`)
        .then(response => {
          if (Array.isArray(response.data)) {
            setImpressions(response.data);
          } else {
            setImpressions([]);
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setImpressions([]);
        });
    }
  }, [selectedGenre]);

  const openModalGenre = () => {
    setShowModalGenre(true);
  };

  const closeModalGenre = () => {
    setShowModalGenre(false);
  };

  const openModalImpression = async (bookId) => {
    try {
      const response = await axios.get(`/board/details/${bookId}`);
      setSelectedBook(response.data.selectedImpression);
      setRelatedImpressions(response.data.relatedImpressions);
      setShowModalImpression(true);
    } catch (error) {
      console.error('Failed to fetch impression details:', error);
    }
  };

  const closeModalImpression = () => {
    setShowModalImpression(false);
    setSelectedBook(null);
    setRelatedImpressions([]);
  };

  const handleGenreSelect = (genre) => {
    setShowModalGenre(false);
    const encodedGenre = encodeURIComponent(genre);
    navigate(`/board/genre?genre=${encodedGenre}`);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/");
  };

  const goToBoard = () => navigate("/board");
  const goToWrite = () => navigate("/board/bookSave");
  const goToMypage = () => navigate("/member");

  return (
    <div className='genrePage'>
      <div>
        <span>
          <img className='shortcuts' alt='logout' src={logoutLight} onClick={logoutHandler} />
          <img className='shortcuts' alt='person' src={personLight} onClick={goToMypage} />
          <img className='shortcuts' alt='pencil' src={pencilLight} onClick={goToWrite} />
          <img className='shortcuts' alt='logo' src={treeLight} onClick={goToBoard} />
        </span>
        <div className='genre-header'>
          <img className='bmkGreen' alt='btn' src={bmkGreen} onClick={openModalGenre} />
          {showModalGenre && <ModalGenre onClose={closeModalGenre} onGenreSelect={handleGenreSelect} />}
          <h1>구절 전체보기 - {selectedGenre}</h1>
        </div>
        <div>
          <div className="phrase-container">
            {impressions.length > 0 ? impressions.map((book, index) => (
              <div key={index} className="phrase" onClick={() => openModalImpression(book.id)}>
                {book.boardPhrase}
              </div>
            )) : <p>No impressions available for this genre.</p>}
          </div>
        </div>
      </div>
      {showModalImpression && selectedBook && (
        <ModalImpressionReason
          book={selectedBook}
          relatedImpressions={relatedImpressions}
          onClose={closeModalImpression}
        />
      )}
    </div>
  );
}

export default Genre;