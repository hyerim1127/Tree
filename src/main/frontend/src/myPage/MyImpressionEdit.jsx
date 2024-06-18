import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Button from "./Button";
import '../modalImpression.css';

const MyImpressionEdit = ({ book, onSave, onClose }) => {
  const [editedPhrase, setEditedPhrase] = useState(book.boardPhrase);
  const [editedReason, setEditedReason] = useState(book.boardReason);

  const phraseRef = useRef(null);
  const reasonRef = useRef(null);

  useEffect(() => {
    adjustTextareaHeight(phraseRef.current);
    adjustTextareaHeight(reasonRef.current);
  }, []);

  const handleSave = async (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 리로드 방지
    try {
      const updatedBook = {
        ...book,
        boardPhrase: editedPhrase,
        boardReason: editedReason
      };

      await axios.put(`http://localhost:8081/board/phraseUpdate/${book.id}`, updatedBook);
      onSave(updatedBook);
      window.location.reload(); 
      onClose();
    } catch (error) {
      console.error('Error updating impression', error);
    }
  };

  const adjustTextareaHeight = (textarea) => {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  };

  const handlePhraseChange = (e) => {
    setEditedPhrase(e.target.value);
    adjustTextareaHeight(e.target);
  };

  const handleReasonChange = (e) => {
    setEditedReason(e.target.value);
    adjustTextareaHeight(e.target);
  };

  return (
    <div className="I-modal">
      <div className="I-modal-reason-content">
        <span className="I-modal-close" onClick={onClose}>&times;</span>
        <h2>인상 깊은 구절 수정</h2>
        <form onSubmit={handleSave} className="I-modal-body">
          <div className="I-book-reason">
            <p>
              <strong>인상 깊은 구절</strong><br /><br />
              <textarea
                ref={phraseRef}
                value={editedPhrase}
                onChange={handlePhraseChange}
                style={{ width: '100%', boxSizing: 'border-box', overflow: 'hidden' }} // 높이 조절
              />
            </p>
            <p>
              <strong>인상 깊은 이유</strong><br /><br />
              <textarea
                ref={reasonRef}
                value={editedReason}
                onChange={handleReasonChange}
                style={{ width: '100%', boxSizing: 'border-box', overflow: 'hidden' }} // 높이 조절
              />
            </p>
          </div>
          <Button onClick={onClose} label="취소" />
          <input type="submit" value="저장" className="btn-mod-del" />
        </form>
      </div>
    </div>
  );
};

export default MyImpressionEdit;
