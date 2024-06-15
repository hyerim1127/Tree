import React, { useState } from 'react';
import './modalBookSearch.css';
import axios from 'axios';

const ModalBookSearch = ({ show, onClose, onSelect }) => {
    const [keyword, setKeyword] = useState('');
    const [books, setBooks] = useState([]);

    const truncateDescription = (description) => {
        const sentences = description.match(/[^\.!\?]+[\.!\?]+/g);
        if (sentences && sentences.length > 0) {
            return sentences.slice(0, 3).join(' ');
        }
        return description;
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/book-search', { keyword: keyword });
            console.log(response.data);
            if (Array.isArray(response.data)) {
                const updatedBooks = response.data.map(book => ({
                    ...book,
                    description: truncateDescription(book.description)
                }));
                setBooks(updatedBooks); // 배열 형태로 데이터를 books 상태에 저장
            } else {
                console.error('Expected an array but got:', response.data);
            }
        } catch (error) {
            console.error('There was an error searching for books!', error);
        }
    };

    const selectElement = (book) => {
        onSelect(book);
        onClose();
    };

    if (!show) {
        return null;
    }

    return (
      <div className="bs-modal">
          <div className="bs-modal-reason-content">
              <span className="bs-modal-close" onClick={onClose}>&times;</span>
              <div className="bs-modal-body">
                  <div className="bs-title">도서 검색</div>
                  <div>
                      <form onSubmit={handleSearch}>
                          <input
                            className="bs-input"
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="도서명을 입력해주세요."
                            required
                          />
                          <button type="submit" className="bs-btn">
                              검색
                          </button>
                      </form>
                  </div>
                  <hr />
                  <div>
                      <table className="bs-table">
                          <thead>
                          <tr>
                              <th>이미지</th>
                              <th>제목</th>
                              <th>저자</th>
                              <th className="bs-table-category">카테고리</th>
                              <th className="bs-table-description">설명</th>
                          </tr>
                          </thead>
                          <tbody>
                          {books.map(book => (
                            <tr key={book.isbn} onClick={() => selectElement(book)}>
                                <td><img src={book.imageURL} width="100" height="150" alt="책 이미지" /></td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.categoryName}</td>
                                <td>{book.description}</td>
                            </tr>
                          ))}
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
      </div>
    );
};

export default ModalBookSearch;
