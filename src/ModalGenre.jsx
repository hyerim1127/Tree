//모달 장르 확인
const ModalGenre = ({ onClose }) => {
    return (
      <div className="modal">
        <div className="modal-content">
          <span className="modal-close" onClick={onClose}>&times;</span>
          <h3>모아보고 싶은 장르를 선택하세요.</h3>
          <button className='modal-genreBtn'>문학</button>
          <button className='modal-genreBtn'>경제/경영</button>
          <button className='modal-genreBtn'>인문</button>
          <br />
          <button className='modal-genreBtn'>예술</button>
          <button className='modal-genreBtn'>기술/공학</button>
          <button className='modal-genreBtn'>자기계발</button>
        </div>
      </div>
  
    );
  };

  export default ModalGenre;