import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import lockLight from '../img/lock-light.png';
import logoutLight from '../img/logout-light.png';
import pencilLight from '../img/pencil-light.png';
import treeLight from '../img/tree-light.png';
import bmkBlue from '../img/bookmark-blue.png';
import ModalGenre from '../genreSelectModal/ModalGenre';
import "./mypage.css";
import "./calendar/CalendarChart.css"
import CalendarChart from './calendar/CalendarChart';
import BubbleChart from './bubble/BubbleChart';
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

const genreData = [
  { name: '고전', value: 10 },
  { name: '소설/시/희곡', value: 55 },
  { name: '에세이', value: 20 },
  { name: '사회과학', value: 45 },
  { name: '경제경영', value: 13 },
  { name: '역사', value: 15 },
  { name: '인문학', value: 25 },
  { name: '과학', value: 15 },
  { name: '자기계발', value: 10 },
];

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
    setShowModalPwChange(false); 
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
        

        <div className='mypage-header'>
          <img className='bmkBlue' alt='btn' src={bmkBlue} onClick={openModalGenre} />
          {showModalGenre && <ModalGenre onClose={closeModalGenre} onGenreSelect={handleGenreSelect} />}
          <h1>마이페이지</h1>
          <button className='mypage-tab' onClick={goToMylog}>내가 쓴 구절들</button>
          <button className='mypage-tab-clicked'>my log</button>
        </div>
        
        <div className="chart-container">
          <div className="calendar-chart-container">
            <h2>작성 게시글 수</h2>
          <CalendarChart data={data}></CalendarChart>
          </div>
        </div>
        <div className="chart-container">
          <div className="calendar-chart-container">
            <h2>장르별 독서 이력</h2>
          <BubbleChart data={genreData}></BubbleChart>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyLog;