//인상깊은구절 조회 (랜덤플로팅)

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import personLight from './img/person-light.png';
import logoutLight from './img/logout-light.png';
import pencilLight from './img/pencil-light.png';
import treeLight from './img/tree-light.png';
import btn from './img/btn.png';
import bmkRed from './img/bookmark-red.png';
import ModalGenre from './ModalGenre';
import ModalImpression from './impression/ModalImpression';
import './modalImpression.css';

const View = () => {
  const [showModal, setShowModal] = useState(false);
  const [showImpressionModal, setShowImpressionModal] = useState(false);
  const [selectedImpression, setSelectedImpression] = useState(null);

  const navigate = useNavigate();

  const goToLogin = () => navigate("/");
  const goToWrite = () => navigate("/board/bookSave");
  const goToBoard = () => navigate("/board");

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openImpressionModal = (impression) => {
    setSelectedImpression(impression);
    setShowImpressionModal(true);
  };

  const closeImpressionModal = () => {
    setShowImpressionModal(false);
    setSelectedImpression(null);
  };

  const handleGenreSelect = (genre) => {
    setShowModal(false);
    navigate(`/phrases?genre=${genre}`);
  };

  const book = {
    image: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791165341909.jpg',
    title: '달러구트 꿈 백화점',
    author: '이미예',
    description: '잠들어야만 입장 가능한 꿈 백화점에서 일어나는 비밀스럽고도 기묘하며 가슴 뭉클한 판타지 소설 여기는 잠들어야만 입장할 수 있는 ‘달러구트 꿈 백화점’입니다. 잠들어야만 입장할 수 있는 독특한 마을. 그곳에 들어온 잠든 손님들에게 가장 인기 있는 곳은, 온갖 꿈을 한데 모아 판매하는 ‘달러구트의 꿈 백화점’이다. 긴 잠을 자는 사람들은 물론이고, 짧은 낮잠을 자는 사람들과 동물들로 매일매일 대성황을 이룬다.',
    details: [
      { title: 'Section 1', content: 'Details about Section 1.' },
      { title: 'Section 2', content: 'Details about Section 2.' },
      { title: 'Section 3', content: 'Details about Section 3.' },
    ]
  };

  const [impressions, setImpressions] = useState([]);

  useEffect(() => {
    const dummyImpressions = [
      "문서 디자인에 의미가 있는 글을 담으면 사람들은 양식을 보지 않고 글의 내용에 집중하는 경향이 있다. 예를 들어 나무위키의 서버는 파라과이에 있다.라는 문장을 적으면 대부분의 사람들은 글씨체에 집중하지 않고 글의 내용에 집중하게 될 것이다. 그렇다고 의미 없이 아무런 글자를 무작위로 입력해도 안 된다.",
      "책(冊), 또는 그림, 글씨, 책 따위를 통틀어 이르는 말. 본래 근대 이전에 사용되었던 중국식 한자어 '도서'는 '도(圖, 도해)'와 '서(書, 글씨)'를 합쳐 가리키는 것이었으나, 근대에 일본어 '토쇼(図書, 도서)', '토쇼칸(図書館, 도서관)'의 영향을 받아 오늘날과 같이 '장서', '서적'의 유의어로 의미가 변하였다.",
      "과학에서는 각종 세미나나 논문 등 자료를 모았을 때 책이 된다. 소설이나 수필, 시집 같은 경우에도 연재나 각 매체에 기고한 내용을 정리하여 책으로 낸다. ",
      "책은 수많은 사람들의 경험과 사상 등이 집약된 지식의 산물, 지식이 농축되고 정제된 액기스이므로, 간접 경험이나 통찰력에 큰 도움을 주며 인격 형성에 기여한다.",
      "종이책의 가치는 점점 떨어져 가고 있다. 굳이 복잡한 과정을 겪어 책으로 낼 정도의 정보와 지식을 제공하려는 저자의 의도가 있기에 종이책은 과거 인터넷 정보보다 절대적인 우위를 유지하고 있다는 지론도 있었다. 다만 정보화 기술의 발달로 이제 인터넷은 본격적인 도서관과 서점이 되어가고 있다."
    ];

    const newImpressions = [];

    for (let i = 0; i < dummyImpressions.length; i++) {
      let newPosition;
      do {
        newPosition = generateRandomPosition(); // 겹치지 않는 위치 생성
      } while (isOverlapping(newImpressions, newPosition)); // 겹치는 경우 다시 생성
      newImpressions.push({
        id: i,
        text: dummyImpressions[i],
        top: newPosition.top,
        left: newPosition.left
      });
    }

    setImpressions(newImpressions);
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
        return true; // 겹치는 경우 true 반환
      }
    }
    return false; // 겹치지 않는 경우 false 반환
  };

  return (
    <div className='pageView'>
      <div>
        <div>
          <img className='shortcuts' alt='logout' src={logoutLight}  onClick={goToLogin} />
          <img className='shortcuts' alt='person' src={personLight} />
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
              onClick={() => openImpressionModal(impression)}
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
            {showImpressionModal && <ModalImpression book={book} onClose={closeImpressionModal} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
