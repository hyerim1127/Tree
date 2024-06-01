import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import lockLight from '../img/lock-light.png';
import logoutLight from '../img/logout-light.png';
import pencilLight from '../img/pencil-light.png';
import treeLight from '../img/tree-light.png';
import bmkBlue from '../img/bookmark-blue.png';
import ModalGenre from '../ModalGenre';
import "../genre.css";
import "./calendar/CalendarChart.css"
import CalendarChart from './calendar/CalendarChart';
import ModalPwChange from './passwordChange/ModalPwChange';

const generateData = (startYear, endYear, minVal, maxVal) => {
  const data = [];
  const startDate = new Date(startYear, 0, 1);
  const endDate = new Date(endYear + 1, 0, 1);
  const yearCount = endYear- startYear;
  const timeDiff = endDate - startDate;
  
  for (let i = 0; i < 300*yearCount; i++) {
      const randomTime = new Date(startDate.getTime() + Math.random() * timeDiff);
      const formattedDate = randomTime.toISOString().split('T')[0];
      const randomValue = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
      data.push({ date: formattedDate, value: randomValue });
  }

  return data;
};

const data = generateData(2021, 2024, 1, 20); 

const MyLog = () => {
  const [showModalPwChange, setShowModalPwChange] = useState(false);

  const [showModalGenre, setShowModalGenre] = useState(false);

  const openModalGenre = () => {
    setShowModalGenre(true);
  };

  const closeModalGenre = () => {
    setShowModalGenre(false);
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

  const navigate = useNavigate();

  const goToLogin = () => navigate("/");
  const goToWrite = () => navigate("/board/bookSave");
  const goToBoard = () => navigate("/board");
  const goToMylog = () => navigate("/member");

  const[isLoggedIn, setIsLoggedIn] = useState(true);
  const logoutHandler = () => {
      localStorage.removeItem("isLoggedIn");
      setIsLoggedIn(false);
      goToLogin();
  }

  return (
    <div className='genrePage'>
      <div>

        <span>
          <img className='shortcuts' alt='logout' src={logoutLight} onClick={logoutHandler} />
          <img className='shortcuts' alt='lock' src={lockLight}  onClick={openModalPwChange} />
          {showModalPwChange && <ModalPwChange onClose={closeModalPwChange} />}
          <img className='shortcuts' alt='pencil' src={pencilLight} onClick={goToWrite} />
          <img className='shortcuts' alt='logo' src={treeLight} onClick={goToBoard} />
        </span>
        

        <div className='header'>
          <img className='bmkGreen' alt='btn' src={bmkBlue} onClick={openModalGenre} />
          {showModalGenre && <ModalGenre onClose={closeModalGenre} onGenreSelect={handleGenreSelect} />}
          <h1>마이페이지</h1>
          <button className='mypage-tab' onClick={goToMylog}>내가 쓴 구절들</button>
          <button className='mypage-tab-clicked'>my log</button>
        </div>
        
        <div className="chart-container ">
          <div className="calendar-chart-container">
            <h2>작성 게시글 수</h2>
          <CalendarChart data={data}></CalendarChart>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyLog;