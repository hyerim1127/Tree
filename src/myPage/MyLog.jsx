import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import lockLight from '../img/lock-light.png';
import logoutLight from '../img/logout-light.png';
import pencilLight from '../img/pencil-light.png';
import treeLight from '../img/tree-light.png';
import bmkBlue from '../img/bookmark-blue.png';
import ModalGenre from '../ModalGenre';
import "../genre.css";
import "./CalendarChart.css"
import CalendarChart from './CalendarChart';

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

const data = generateData(2021, 2024, 1, 50); 

const MyLog = () => {

  const book = {
    image: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791165341909.jpg',
    title: '달러구트 꿈 백화점',
    author: '이미예',
    description: '잠들어야만 입장 가능한 꿈 백화점에서 일어나는 비밀스럽고도 기묘하며 가슴 뭉클한 판타지 소설 여기는 잠들어야만 입장할 수 있는 ‘달러구트 꿈 백화점’입니다. 잠들어야만 입장할 수 있는 독특한 마을. 그곳에 들어온 잠든 손님들에게 가장 인기 있는 곳은, 온갖 꿈을 한데 모아 판매하는 ‘달러구트의 꿈 백화점’이다. 긴 잠을 자는 사람들은 물론이고, 짧은 낮잠을 자는 사람들과 동물들로 매일매일 대성황을 이룬다.',
    reason: '문서 디자인에 의미가 있는 글을 담으면 사람들은 양식을 보지 않고 글의 내용에 집중하는 경향이 있다. 예를 들어 나무위키의 서버는 파라과이에 있다.라는 문장을 적으면 대부분의 사람들은 글씨체에 집중하지 않고 글의 내용에 집중하게 될 것이다. 그렇다고 의미 없이 아무런 글자를 무작위로 입력해도 안 된다. 그렇다고 의미 없이 아무런 글자를 입력해도 안 된다. 그렇다고 의미 없이 아무런 글자를 무작위로 입력해도 안 된다. 그렇다고 의미 없이 아무런 글자를 입력해도 안 된다. 그렇다고 의미 없이 아무런 글자를 무작위로 입력해도 안 된다. '
  };


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

  const dummyImpressions = [
    "문서 디자인에 의미가 있는 글을 담으면 사람들은 양식을 보지 않고 글의 내용에 집중하는 경향이 있다. 예를 들어 나무위키의 서버는 파라과이에 있다.라는 문장을 적으면 대부분의 사람들은 글씨체에 집중하지 않고 글의 내용에 집중하게 될 것이다. 그렇다고 의미 없이 아무런 글자를 무작위로 입력해도 안 된다. 그렇다고 의미 없이 아무런 글자를 입력해도 안 된다.",
    "문학 구절 2",
    "문학 구절 3",
    "문학 구절 1",
    "문학 구절 2",
    "문학 구절 3",
    "문학 구절 1",
    "문학 구절 2",
    "문학 구절 3",
    "문학 구절 1",
    "문학 구절 2",
    "문학 구절 3",
    "문학 구절 1",
    "문학 구절 2"
  ];


  const impressions = dummyImpressions;


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
          <img className='shortcuts' alt='lock' src={lockLight} />
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