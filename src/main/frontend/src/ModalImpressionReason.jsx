import React from 'react';
import BookImage from "./impression/BookImage";
import BookInfo from "./impression/BookInfo";
import ToggleDetail from "./ToggleDetail";

const ModalImpressionReason = ({ book, relatedImpressions, onClose }) => {

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
            {book.boardReason}
          </div>
          <div className="toggle-sections">
            {relatedImpressions.map((impression, index) => (
              <ToggleDetail key={index} detail={{title: impression.boardPhrase, content: impression.boardReason}} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalImpressionReason;