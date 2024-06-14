import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import personLight from './img/person-light.png';
import logoutLight from './img/logout-light.png';
import ModalBookSearch from './ModalBookSearch';
import Description from './Description';
import './modalBookSearch.css';

const WriteImpression = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [writer, setWriter] = useState('');
    const [category, setCategory] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [phrase, setPhrase] = useState('');
    const [reason, setReason] = useState('');
    
    const goToLogin = () => navigate("/");
    const goToBoard = () => navigate("/board");
    const goToMypage = () => navigate("/member");

    const [notAllow, setNotAllow] = useState(true);
    useEffect(() => {
        if (phrase === "" || reason === "") {
            setNotAllow(true);
            return;
        }
        setNotAllow(false);
    }, [title, writer, phrase, reason]);

    const goToPageR = () => {
        navigate("/board");
    }
    
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const logoutHandler = () => {
        localStorage.removeItem("isLoggedIn");
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

    return (
        <div className='bs-page'>
            <div>
                <inline>
                    <img className='shortcuts' alt='logout' src={logoutLight} onClick={logoutHandler} />
                    <img className='shortcuts' alt='person' src={personLight} onClick={goToMypage} />
                </inline>
                
            </div>
            <div className="bs-descriptionPhrase">
                <h1 style={{fontSize:"40px", fontWeight:"bolder"}} >인상 깊은 구절</h1>
                <h5>최근 독서를 하면서 다른 사람들과 공유하고 싶었던<br /> 마음에 남는 구절을 작성해 주세요</h5>
            </div>
            <div className="bs-form-container">
            <div className="bs-form-left">
                <div className='contentWrap'>
                    <div className='inputWrap'>
                        <input 
                            className='input'
                            value={title}
                            placeholder='책의 제목을 입력해 주세요'
                            readOnly />
                        <button onClick={openModalBookSearch} className='duplicationCheck'>책 검색</button>
                    <ModalBookSearch show={showModal} onClose={closeModalBookSearch} onSelect={handleBookSelect} />
                    </div>
                    <div className='inputWrap'>
                        <input 
                            className='input'
                            value={writer}
                            placeholder='책의 작가를 입력해 주세요'
                            readOnly />
                    </div>
                    <div className='inputWrap'>
                        <input 
                            className='input'
                            value={category}
                            placeholder='카테고리'
                            readOnly />
                    </div>
                    <div className='inputWrap'>
                        <img 
                            src={imageURL}
                            width="100"
                            height="150"
                            alt="책 이미지"
                            id="bookImage"/>
                    </div>
                </div>
            </div>

            <div className="bs-form-right">
                <div className='contentWrap'>
                    <div className='inputTextWrap'>
                        <textarea 
                            className='inputText'
                            value={phrase}
                            placeholder='인상 깊었던 구절을 200자 이내로 작성해주세요.'
                            onChange={(e) => setPhrase(e.target.value)} />
                    </div>
                    <div className='inputTextWrap2'>
                        <textarea 
                            className='inputText2'
                            value={reason}
                            placeholder='해당 구절이 인상 깊었던 이유를 300자 이내로 작성해 주세요.'
                            onChange={(e) => setReason(e.target.value)} />
                    </div>
                    <div>
                        <button onClick={goToBoard}
                            disabled={notAllow}
                            className='bs-bottomButton'>
                            확인
                        </button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default WriteImpression;