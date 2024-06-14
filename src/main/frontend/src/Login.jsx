import React, { useState } from 'react';
import './modalBookSearch.css';
import axios from 'axios';

const ModalBookSearch = ({ show, onClose, onSelect }) => {
    const [keyword, setKeyword] = useState('');
    const [books, setBooks] = useState([]); // 빈 배열로 초기화

    if (!show) {
        return null;
    }

    const handleSearch = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/api/book-search', keyword, { // JSON 형식으로 전송
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log(response.data); // 응답 데이터를 콘솔에 출력하여 확인
            if (Array.isArray(response.data)) {
                setBooks(response.data);
            } else {
                console.error('Expected an array but got:', response.data);
            }
        })
        .catch(error => {
            console.error('There was an error searching for books!', error);
        });
    };

    const selectElement = (book) => {
        onSelect(book);
        onClose();
    };

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
                                required />
                            <button type="submit" className='bs-btn'>검색</button>
                        </form>
                    </div>
                    <hr />
                    <div>
                        <table className='bs-table'>
                            <thead>
                                <tr>
                                    <th>이미지</th>
                                    <th>제목</th>
                                    <th>저자</th>
                                    <th>카테고리</th>
                                    <th>ISBN</th>
                                    <th>설명</th>
                                </tr>
                            </thead>
                            <tbody>
                                {books.map(book => (
                                    <tr key={book.isbn} onClick={() => selectElement(book)} style={{ cursor: 'pointer' }}>
                                        <td><img src={book.imageURL} width="100" height="150" alt="책 이미지"/></td>
                                        <td>{book.title}</td>
                                        <td>{book.author}</td>
                                        <td>{book.categoryName}</td>
                                        <td>{book.isbn}</td>
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
