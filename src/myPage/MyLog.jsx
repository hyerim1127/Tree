import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import lockLight from '../img/lock-light.png';
import logoutLight from '../img/logout-light.png';
import pencilLight from '../img/pencil-light.png';
import treeLight from '../img/tree-light.png';
import bmkBlue from '../img/bookmark-blue.png';
import ModalGenre from '../ModalGenre';
import "../genre.css";
import CalendarChart from './CalendarChart';

const MyLog = () => {
  const data = [
    { date: '2024-01-01', value: 10 },
    { date: '2024-01-02', value: 20 },
    { date: '2024-01-03', value: 10 },
    { date: '2024-01-04', value: 25 },
    { date: '2024-01-05', value: 30 },
    { date: '2024-01-06', value: 5 },
    { date: '2024-01-07', value: 17 },
    { date: '2024-01-08', value: 21 },
    { date: '2024-01-09', value: 6 },
    { date: '2024-01-10', value: 25 },
    { date: '2024-01-11', value: 42 },
    { date: '2024-01-12', value: 5 },
    // 나머지 데이터 추가...
  ];
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
        
      <CalendarChart data={data}></CalendarChart>
      </div>
    </div>
  );
}

export default MyLog;