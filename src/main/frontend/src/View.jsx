import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import personLight from './img/person-light.png';
import logoutLight from './img/logout-light.png';
import pencilLight from './img/pencil-light.png';
import treeLight from './img/tree-light.png';
import btn from './img/btn.png';
import bmkRed from './img/bookmark-red.png';
import ModalGenre from './genreSelectModal/ModalGenre';
import ModalImpression from './impression/ModalImpression';
import './modalImpression.css';
import axios from 'axios';

const View = () => {
  const [showModal, setShowModal] = useState(false);
  const [showImpressionModal, setShowImpressionModal] = useState(false);
  const [selectedImpression, setSelectedImpression] = useState(null);
  const [relatedImpressions, setRelatedImpressions] = useState([]);
  const [impressions, setImpressions] = useState([]);

  const navigate = useNavigate();

  const goToBoard = () => navigate("/board");
  const goToWrite = () => navigate("/board/bookSave");
  const goToMypage = () => navigate("/member");
  const goToLogin = () => navigate("/");

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openImpressionModal = async (impressionId) => {
    try {
      const response = await axios.get(`/board/details/${impressionId}`);
      console.log(response.data); // 데이터 확인을 위한 로그
      setSelectedImpression(response.data.selectedImpression);
      setRelatedImpressions(response.data.relatedImpressions);
      setShowImpressionModal(true);
    } catch (error) {
      console.error('Failed to fetch impression details:', error);
    }
  };

  const closeImpressionModal = () => {
    setShowImpressionModal(false);
    setSelectedImpression(null);
    setRelatedImpressions([]);
  };

  const handleGenreSelect = (genre) => {
    setShowModal(false);
    navigate(`/board/genre?genre=${genre}`);
  };

  useEffect(() => {
    const fetchImpressions = async () => {
      try {
        const response = await axios.get('/board');
        const impressionsArray = response.data.slice(0, 6); // 최대 6개의 구절만 가져오기
        const newImpressions = [];
        for (const [index, impression] of impressionsArray.entries()) {
          let newPosition;
          do {
            newPosition = generateRandomPosition();
          } while (isOverlapping(newImpressions, newPosition));

          newImpressions.push({
            id: impression.id,
            text: impression.boardPhrase,
            top: newPosition.top,
            left: newPosition.left
          });
        }
        setImpressions(newImpressions);
      } catch (error) {
        console.error('Failed to fetch impressions:', error);
      }
    };

    fetchImpressions();
  }, []);

  const generateRandomPosition = () => ({
    top: Math.floor(Math.random() * (window.innerHeight - 200)) + 'px',
    left: Math.floor(Math.random() * (window.innerWidth - 300)) + 'px'
  });

  const isOverlapping = (existingImpressions, newPosition) => {
    for (const impression of existingImpressions) {
      if (
        Math.abs(parseInt(impression.top) - parseInt(newPosition.top)) < 150 &&
        Math.abs(parseInt(impression.left) - parseInt(newPosition.left)) < 300
      ) {
        return true;
      }
    }
    return false;
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    goToLogin();
  };

  return (
    <div className='pageView'>
      <div>
        <div>
          <img className='shortcuts' alt='logout' src={logoutLight} onClick={logoutHandler}/>
          <img className='shortcuts' alt='person' src={personLight} onClick={goToMypage} />
          <img className='shortcuts' alt='pencil' src={pencilLight} onClick={goToWrite} />
          <img className='shortcuts' alt='logo' src={treeLight} onClick={goToBoard} />
        </div>
        <img className='btnL' alt='btn' src={btn} onClick={goToWrite} />
        <img className='btnR' alt='btn' src={btn} />
        <img className='bmkRed' alt='btn' src={bmkRed} />
        <div style={{ position: 'relative', minHeight: '100vh' }}>
          {impressions.map(impression => (
            <div
              key={impression.id}
              className="phrases"
              onClick={() => openImpressionModal(impression.id)}
              style={{
                position: 'absolute',
                top: impression.top,
                left: impression.left,
                maxWidth: '300px',
                padding: '10px',
                borderRadius: '80px',
                filter: 'none',
                wordWrap: 'break-word',
                color: '#562E12',
                textAlign: 'center'
              }}>
              {impression.text}
            </div>
          ))}
          <div>
            <button className='showAllBtn' onClick={openModal}>구절 전체 보기</button>
            {showModal && <ModalGenre onClose={closeModal} onGenreSelect={handleGenreSelect} />}
            {showImpressionModal && selectedImpression && (
              <ModalImpression
                book={selectedImpression}
                relatedImpressions={relatedImpressions}
                onClose={closeImpressionModal}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;