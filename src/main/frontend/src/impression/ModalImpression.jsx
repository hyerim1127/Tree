import React, { useState } from 'react';
import BookImage from "./BookImage";
import BookInfo from "./BookInfo";

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
          <div className="toggle-sections">
            {relatedImpressions.map((impression, index) => (
              <ToggleDetail key={index} detail={{ title: impression.boardPhrase, content: impression.boardReason }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ToggleDetail = ({ detail }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="toggle-detail">
      <div className="toggle-header" onClick={toggle}>
        {detail.title}
      </div>
      {isOpen && (
        <div className="toggle-content">
          {detail.content}
        </div>
      )}
    </div>
  );
};

export default ModalImpressionReason;