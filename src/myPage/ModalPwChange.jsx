//장르 선택 팝업창

const ModalPwChange = ({ onClose, onGenreSelect }) => {
    const handleGenreClick = (genre) => {
      onGenreSelect(genre);
    };
  
    return (
      <div className="modal">
        <div className="modal-content">
          <span className="modal-close" onClick={onClose}>&times;</span>
          <h3>모아보고 싶은 장르를 선택하세요.</h3>
          <br />
          <button className='modal-genreBtn' onClick={() => handleGenreClick('고전')}>고전</button>
          <button className='modal-genreBtn' onClick={() => handleGenreClick('소설/시/희곡')}>소설/시/희곡</button>
          <button className='modal-genreBtn' onClick={() => handleGenreClick('에세이')}>에세이</button>
          <br />
          <button className='modal-genreBtn' onClick={() => handleGenreClick('과학')}>과학</button>
          <button className='modal-genreBtn' onClick={() => handleGenreClick('사회과학')}>사회과학</button>
          <button className='modal-genreBtn' onClick={() => handleGenreClick('경제경영')}>경제경영</button>
          <br />
          <button className='modal-genreBtn' onClick={() => handleGenreClick('역사')}>역사</button>
          <button className='modal-genreBtn' onClick={() => handleGenreClick('인문학')}>인문학</button>
          <button className='modal-genreBtn' onClick={() => handleGenreClick('자기계발')}>자기계발</button>
        </div>
      </div>
    );
  };
  
  export default ModalPwChange;
  