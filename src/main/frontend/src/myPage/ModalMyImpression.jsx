import React from 'react';
import BookImage from "../impression/BookImage";
import BookInfo from "../impression/BookInfo";
import Button from "./Button";

const ModalMyImpression = ({ book, onClose }) => {
  const handleDelete = () => {
    // 구절 삭제 로직 구현
    alert('구절이 삭제되었습니다.');
  };

  const handleEdit = () => {
    // 구절 수정 로직 구현
    alert('구절을 수정할 수 있습니다.');
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
    </div>
  );
};

export default ModalMyImpression;