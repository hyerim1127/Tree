import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import lockLight from '../img/lock-light.png';
import logoutLight from '../img/logout-light.png';
import pencilLight from '../img/pencil-light.png';
import treeLight from '../img/tree-light.png';
import bmkBlue from '../img/bookmark-blue.png';
import ModalGenre from '../genreSelectModal/ModalGenre';
import ModalMyImpression from './ModalMyImpression';
import ModalPwChange from './passwordChange/ModalPwChange';
import "./mypage.css";

const MyMain = () => {
  const [showModalGenre, setShowModalGenre] = useState(false);
  const [showModalImpression, setShowModalImpression] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModalPwChange, setShowModalPwChange] = useState(false);
  const [impressions, setImpressions] = useState([]);
  const navigate = useNavigate();

  const boardWriter = localStorage.getItem("userEmail");
 // const boardWriter = userEmail ? userEmail.split("@")[0] : null;

  useEffect(() => {
    const fetchImpressions = async () => {
      if (!boardWriter) {
        console.error("Board writer not found in localStorage");
        return;
      }
      try {
        const response = await axios.get(`http://localhost:8081/member/${boardWriter}`);
        setImpressions(response.data);
      } catch (error) {
        console.error("Error fetching impressions", error);
      }
    };

    fetchImpressions();
  }, [boardWriter]);

  const openModalGenre = () => {
    setShowModalGenre(true);
  };

  const closeModalGenre = () => {
    setShowModalGenre(false);
  };

  const openModalImpression = (book) => {
    setSelectedBook(book);
    setShowModalImpression(true);
  };

  const closeModalImpression = () => {
    setShowModalImpression(false);
    setSelectedBook(null);
  };

  const handleGenreSelect = (genre) => {
    setShowModalGenre(false);
    navigate(`/board/genre?genre=${genre}`);
  };

  const openModalPwChange = () => {
    setShowModalPwChange(true); // 비밀번호 변경 모달 열기
  };

  const closeModalPwChange = () => {
    setShowModalPwChange(false); // 비밀번호 변경 모달 닫기
  };

  const goToLogin = () => navigate("/");
  const goToWrite = () => navigate("/board/bookSave");
  const goToBoard = () => navigate("/board");
  const goToMylog = () => navigate("/member/log");

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    goToLogin();
  };

  return (
    <div className='genrePage'>
      <div>
        <span>
          <img className='shortcuts' alt='logout' src={logoutLight} onClick={logoutHandler} />
          <img className='shortcuts' alt='lock' src={lockLight} onClick={openModalPwChange} />
          {showModalPwChange && <ModalPwChange onClose={closeModalPwChange} />}
          <img className='shortcuts' alt='pencil' src={pencilLight} onClick={goToWrite} />
          <img className='shortcuts' alt='logo' src={treeLight} onClick={goToBoard} />
        </span>

        <div className='mypage-header'>
          <img className='bmkBlue' alt='btn' src={bmkBlue} onClick={openModalGenre} />
          {showModalGenre && <ModalGenre onClose={closeModalGenre} onGenreSelect={handleGenreSelect} />}
          <h1>마이페이지</h1>
          <button className='mypage-tab-clicked'>내가 쓴 구절들</button>
          <button className='mypage-tab' onClick={goToMylog}>my log</button>
        </div>

        <div>
          <div className="phrase-container">
            {impressions.map((impression, index) => (
              <div
                key={index}
                className="phrase"
                onClick={() => openModalImpression(impression)}
              >
                {impression.boardPhrase}
              </div>
            ))}
          </div>
        </div>
      </div>
      {showModalImpression && selectedBook && (
        <ModalMyImpression book={selectedBook} onClose={closeModalImpression} />
      )}
    </div>
  );
};

export default MyMain;