import React, { useState } from 'react';
import axios from 'axios';
import BookImage from "../impression/BookImage";
import BookInfo from "../impression/BookInfo";
import Button from "./Button";
import MyImpressionEdit from './MyImpressionEdit'; // 수정 모달 추가

const ModalMyImpression = ({ book, onClose }) => {
  const [showEditModal, setShowEditModal] = useState(false); // 수정 모달 상태 추가
  const [deleted, setDeleted] = useState(false); // 삭제 여부 상태 추가

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8081/board/delete/${book.id}`);
      alert('구절이 삭제되었습니다.');
      window.location.reload(); 
    } catch (error) {
      console.error('Error deleting impression', error);
    }
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  return (
    <div className="I-modal">
      <div className="I-modal-reason-content">
        <span className="I-modal-close" onClick={onClose}>&times;</span>
        <div className="I-modal-body">
          <div style={{ display: 'flex', alignItems: 'stretch' }}>
            <div className="I-book-image">
              <BookImage src={book.bookImageURL} />
            </div>
            <div className="I-book-info">
              <BookInfo
                title={book.bookTitle}
                author={book.bookAuthor}
                description={book.bookCategoryName}
              />
            </div>
          </div>
          <div className="I-book-reason">
            <p>
              <strong>인상 깊은 구절</strong><br /><br />
              {book.boardPhrase}
            </p><br />
            <p>
              <strong>인상 깊은 이유</strong><br /><br />
              {book.boardReason}
            </p>
          </div>
          <Button onClick={handleDelete} label="삭제" />
          <Button onClick={handleEdit} label="수정" />
        </div>
      </div>
      {/* 수정 모달 */}
      {showEditModal && (
        <MyImpressionEdit
          book={book}
          onSave={(updatedBook) => {
            // 수정된 데이터 처리 로직
            //alert('구절이 수정되었습니다.');
            // 여기서 수정 후의 작업을 할 수 있음 (API 호출 등)
            // onSave 함수를 통해 수정 후의 데이터를 처리할 수 있음
            // 예: onClose(); // 모달 닫기
          }}
          onClose={closeEditModal}
        />
      )}
    </div>
  );
};

export default ModalMyImpression;
