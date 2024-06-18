import React, { useState } from 'react';
import axios from 'axios';
import Button from "./Button";

const MyImpressionEdit = ({ book, onSave, onClose }) => {
  const [editedPhrase, setEditedPhrase] = useState(book.boardPhrase);
  const [editedReason, setEditedReason] = useState(book.boardReason);

  const handleSave = async () => {
    try {
      const updatedBook = {
        ...book,
        boardPhrase: String(editedPhrase),
        boardReason: String(editedReason)
      };

      await axios.put(`http://localhost:8081/board/phraseUpdate/${book.id}`, updatedBook);
      await axios.post(`http://localhost:8081/board/phraseUpdate/${book.id}`, updatedBook);
      onSave(updatedBook);
      onClose();
    } catch (error) {
      console.error('Error updating impression', error);
    }
  };

  return (
    <div className="I-modal">
      <div className="I-modal-reason-content">
        <span className="I-modal-close" onClick={onClose}>&times;</span>
        <h2>인상 깊은 구절 수정</h2>
        <div className="I-modal-body">
          <div className="I-book-reason">
            <div>
              <p>
                <strong>인상 깊은 구절</strong><br /><br />
                <textarea
                  value={editedPhrase}
                  onChange={(e) => setEditedPhrase(e.target.value)}
                  rows={4}
                  cols={50}
                />
              </p>
            </div>
            <div>
              <p>
                <strong>인상 깊은 이유</strong><br /><br />
                <textarea
                  value={editedReason}
                  onChange={(e) => setEditedReason(e.target.value)}
                  rows={4}
                  cols={50}
                />
              </p>
            </div>
          </div>
          <Button onClick={onClose} label="취소" />
          <Button onClick={handleSave} label="저장" />
        </div>
      </div>
    </div>
  );
};

export default MyImpressionEdit;
