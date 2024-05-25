//장르 선택 후 보여지는 장르별 구절 조회 페이지
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import personLight from './img/person-light.png';
import logoutLight from './img/logout-light.png';
import pencilLight from './img/pencil-light.png';
import treeLight from './img/tree-light.png';
import bmkGreen from './img/bookmark-green.png';
import ModalGenre from './ModalGenre';
import "./genre.css";

const Genre = () => {

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const selectedGenre = params.get('genre');

    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
      setShowModal(true);
    };

    const closeModal = () => {
      setShowModal(false);
    };

    const handleGenreSelect = (genre) => {
      setShowModal(false);
      navigate(`/board/genre?genre=${genre}`);
    };


    const dummyImpressions = {
      '소설/시/희곡': ["문서 디자인에 의미가 있는 글을 담으면 사람들은 양식을 보지 않고 글의 내용에 집중하는 경향이 있다. 예를 들어 나무위키의 서버는 파라과이에 있다.라는 문장을 적으면 대부분의 사람들은 글씨체에 집중하지 않고 글의 내용에 집중하게 될 것이다. 그렇다고 의미 없이 아무런 글자를 무작위로 입력해도 안 된다. 그렇다고 의미 없이 아무런 글자를 입력해도 안 된다.", "문학 구절 2", "문학 구절 3","문학 구절 1", "문학 구절 2", "문학 구절 3","문학 구절 1", "문학 구절 2", "문학 구절 3","문학 구절 1", "문학 구절 2", "문학 구절 3","문학 구절 1", "문학 구절 2", ],
      '과학': ["경제/경영 구절 1", "경제/경영 구절 2", "경제/경영 구절 3"],
      '고전': ["인문 구절 1", "인문 구절 2", "인문 구절 3"],
      '사회과학': ["예술 구절 1", "예술 구절 2", "예술 구절 3"],
      '경제경영': ["기술/공학 구절 1", "기술/공학 구절 2", "기술/공학 구절 3"],
      '에세이': ["자기계발 구절 1", "자기계발 구절 2", "자기계발 구절 3"],
      '역사': ["문학 구절 1", "문학 구절 2", "문학 구절 3"],
      '인문학': ["경제/경영 구절 1", "경제/경영 구절 2", "경제/경영 구절 3"],
      '자기계발': ["인문 구절 1", "인문 구절 2", "인문 구절 3"],
    };
    const impressions = dummyImpressions[selectedGenre] || [];

    const navigate = useNavigate();

    const goToLogin = () => navigate("/");
    const goToWrite = () => navigate("/board/bookSave");
    const goToBoard = () => navigate("/board");

    return (
        <div className='genrePage'>
          <div>
            <span>
              <img className='shortcuts' alt='logout' src={logoutLight} onClick={goToLogin} />
              <img className='shortcuts' alt='person' src={personLight} />
              <img className='shortcuts' alt='pencil' src={pencilLight} onClick={goToWrite} />
              <img className='shortcuts' alt='logo' src={treeLight} onClick={goToBoard} />
            </span>
            <div className='header'>
              <img className='bmkGreen' alt='btn' src={bmkGreen} onClick={openModal} />
              {showModal && <ModalGenre onClose={closeModal} onGenreSelect={handleGenreSelect} />}
              <h1>구절 전체보기 - {selectedGenre}</h1>
            </div>
            <div>
              <div className="phrase-container">
              {impressions.map((impression, index) => (
                <div key={index} className="phrase">
                  {impression}
                </div>
              ))}
            </div>
          </div>
        </div>
    </div>
  );
}

export default Genre;