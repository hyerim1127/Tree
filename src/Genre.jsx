import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import personLight from './img/person-light.png';
import logoutLight from './img/logout-light.png';
import pencilLight from './img/pencil-light.png';
import treeLight from './img/tree-light.png';
import btn from './img/btn.png';
import "./genre.css";

const Genre = () => {

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const selectedGenre = params.get('genre');

    const dummyImpressions = {
      '문학': ["문학 구절 1", "문학 구절 2", "문학 구절 3"],
      '경제/경영': ["경제/경영 구절 1", "경제/경영 구절 2", "경제/경영 구절 3"],
      '인문': ["인문 구절 1", "인문 구절 2", "인문 구절 3"],
      '예술': ["예술 구절 1", "예술 구절 2", "예술 구절 3"],
      '기술/공학': ["기술/공학 구절 1", "기술/공학 구절 2", "기술/공학 구절 3"],
      '자기계발': ["자기계발 구절 1", "자기계발 구절 2", "자기계발 구절 3"],
    };
    const impressions = dummyImpressions[selectedGenre] || [];

    const navigate = useNavigate();

    const goToLogin = () => navigate("/");
    const goToWrite = () => navigate("/board/bookSave");

    return (
        <div className='genrePage'>
          <div>
            <span>
              <img className='shortcuts' alt='logout' src={logoutLight} />
              <img className='shortcuts' alt='person' src={personLight} />
              <img className='shortcuts' alt='pencil' src={pencilLight} onClick={goToWrite} />
              <img className='shortcuts' alt='logo' src={treeLight} onClick={goToLogin} />
            </span>
            <div>
            <h1>구절 전체보기 - {selectedGenre}</h1>
            <div>
              {impressions.map((impression, index) => (
                <div key={index} className="phrase">
                  {impression}
                </div>
              ))}
            </div>
          </div>
          <img className='btnL' alt='btn' src={btn} onClick={goToWrite} />
          <img className='btnR' alt='btn' src={btn} />
        </div>
    </div>
  );
}

export default Genre;