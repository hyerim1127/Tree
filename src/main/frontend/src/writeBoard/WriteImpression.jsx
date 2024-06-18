import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import personLight from '../img/person-light.png';
import logoutLight from '../img/logout-light.png';
import treeLight from '../img/tree-light.png';
import ModalBookSearch from './ModalBookSearch';
import './writeImpression.css';
import axios from 'axios';

const WriteImpression = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [writer, setWriter] = useState('');
    const [category, setCategory] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [phrase, setPhrase] = useState('');
    const [reason, setReason] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const goToLogin = () => navigate("/");
    const goToMypage = () => navigate("/member");

    const [notAllow, setNotAllow] = useState(true);
    useEffect(() => {
        if (phrase === "" || reason === "") {
            setNotAllow(true);
        } else {
            setNotAllow(false);
        }
    }, [phrase, reason]);

    useEffect(() => {
        // 로컬스토리지에서 이메일 값을 가져와 상태로 설정
        const email = localStorage.getItem('userEmail');
        if (email) {
            setUserEmail(email);
        }
    }, []);

    const goToBoard = () => navigate("/board");

    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const logoutHandler = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userEmail");  // 이메일 값도 로컬스토리지에서 제거
        setIsLoggedIn(false);
        goToLogin();
    }

    const [showModal, setShowModal] = useState(false);
    const openModalBookSearch = () => {
        setShowModal(true);
    };
    const closeModalBookSearch = () => {
        setShowModal(false);
    };

    const handleBookSelect = (book) => {
        setTitle(book.title);
        setWriter(book.author);
        setCategory(book.categoryName);
        setImageURL(book.imageURL);
    };

    const onClickPhrase = () => {
        axios.post('http://localhost:8081/board/bookSave', {
            bookAuthor: writer,
            bookCategoryName: category,
            bookTitle: title,
            bookImageURL: imageURL,
            bookPhrase: phrase,
            bookReason: reason,
            boardWriter: userEmail
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            if (res.status === 200) {
                navigate("/board");
            } else {
                alert('구절 저장에 실패했습니다.');
            }
        })
        .catch(err => {
            console.error('ERROR: ', err);
            alert('서버와의 통신 중 오류가 발생했습니다.');
        });
    }

    return (
      <div className="wi-page">
          <div>
              <inline>
                  <img className="shortcuts" alt="logout" src={logoutLight} onClick={logoutHandler} />
                  <img className="shortcuts" alt="person" src={personLight} onClick={goToMypage} />
                  <img className='shortcuts' alt='logo' src={treeLight} onClick={goToBoard} />
              </inline>
          </div>
          <center>
              <div>
                  <h1 className="wi-descriptionPhrase">인상 깊은 구절</h1>
                  <h5>최근 독서를 하면서 다른 사람들과 공유하고 싶었던<br /> 마음에 남는 구절을 작성해 주세요</h5>
              </div>
          </center>
          <div className="wi-form-container">
              <div className="wi-form-left">
                  <div className="wi-contentWrap">
                      <div className="wi-inputWrap">
                          <input
                            className="wi-input"
                            value={title}
                            placeholder="책의 제목을 입력해 주세요"
                            readOnly />
                          <button onClick={openModalBookSearch} className="wi-bookSearchBtn">책 검색</button>
                          <ModalBookSearch show={showModal} onClose={closeModalBookSearch} onSelect={handleBookSelect} />
                      </div>
                      <div style={{ display: 'flex' }}>
                        <div className="wi-inputWrap-img">
                            <img
                                src={imageURL}
                                width="100"
                                height="150"
                                alt="책 이미지"
                                id="bookImage" />
                        </div>
                        <div style={{paddingLeft:"20px"}}>
                        <div className="wi-inputWrap-etc">
                          <input
                            className="wi-input"
                            value={writer}
                            placeholder="책의 작가를 입력해 주세요"
                            readOnly />
                        </div>
                        
                        <div className="wi-inputWrap-etc">
                            <input
                                className="wi-input"
                                value={category}
                                placeholder="카테고리"
                                readOnly />
                        </div>
                        </div>
                        
                      </div>
                      
                  </div>
              </div>
              <div className="wi-form-right">
                  <div className="wi-contentWrap">
                      <div className="wi-inputTextWrap">
                            <textarea
                              className="wi-inputText"
                              value={phrase}
                              placeholder="인상 깊었던 구절을 200자 이내로 작성해주세요."
                              onChange={(e) => setPhrase(e.target.value)} />
                      </div>
                      <div className="wi-inputTextWrap2">
                            <textarea
                              className="wi-inputText2"
                              value={reason}
                              placeholder="해당 구절이 인상 깊었던 이유를 300자 이내로 작성해 주세요."
                              onChange={(e) => setReason(e.target.value)} />
                      </div>
                  </div>
                  <div>
                      <button onClick={onClickPhrase}
                              disabled={notAllow}
                              className="wi-bottomButton">
                          확인
                      </button>
                  </div>
              </div>
          </div>
      </div>
    );
}

export default WriteImpression;