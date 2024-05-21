const ModalGenre = ({ onClose, onGenreSelect }) => {
  const handleGenreClick = (genre) => {
    onGenreSelect(genre);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="modal-close" onClick={onClose}>&times;</span>
        <h3>모아보고 싶은 장르를 선택하세요.</h3>
        <button className='modal-genreBtn' onClick={() => handleGenreClick('문학')}>문학</button>
        <button className='modal-genreBtn' onClick={() => handleGenreClick('경제/경영')}>경제/경영</button>
        <button className='modal-genreBtn' onClick={() => handleGenreClick('인문')}>인문</button>
        <br />
        <button className='modal-genreBtn' onClick={() => handleGenreClick('예술')}>예술</button>
        <button className='modal-genreBtn' onClick={() => handleGenreClick('기술/공학')}>기술/공학</button>
        <button className='modal-genreBtn' onClick={() => handleGenreClick('자기계발')}>자기계발</button>
      </div>
    </div>
  );
};

export default ModalGenre;
