import React from 'react';
import './modalBookSearch.css'; // CSS 파일을 임포트합니다.
import BookImage from "./impression/BookImage";
import BookInfo from "./impression/BookInfo";

const ModalBookSearch = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="bs-modal">
      <div className="bs-modal-reason-content">
        <span className="bs-modal-close" onClick={onClose}>&times;</span>
        <div className="bs-modal-body">
          <div style={{ display: 'flex', alignItems: 'stretch' }}>
            <div className="bs-book-image">
              book
            </div>
            <div className="bs-book-info">
              book information
            </div>
          </div>
          <div className="bs-book-reason">
            hello
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalBookSearch;
