import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import mainImg from './img/mainImage.png';
import personLight from './img/person-light.png';
import logoutLight from './img/logout-light.png';
import btn from './img/btn.png';

const WriteImpression = () => {

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const handleTitle = (e) => {
        setTitle(e.target.value);
    }

    const [writer, setWriter] = useState('');
    const handleWriter = (e) => {
        setWriter(e.target.value);
    }

    const [phrase, setPhrase] = useState('');
    const handlePhrase = (e) => {
        setPhrase(e.target.value);
    }

    const [reason, setReason] = useState('');
    const handleReason = (e) => {
        setReason(e.target.value);
    }

    const onClickConfirmButton = () => {
        navigate('/view');
    }
    
    const[notAllow, setNotAllow] = useState(true);
    useEffect(() => {
        if(title=="" || writer=="" || phrase=="" || reason=="") {
            setNotAllow(true);
            return;
        }
        setNotAllow(false);
    }, );

    const goToPageR = () => {
        navigate("/view");
    }

    return (
        <div className='page'>
            <div>
                <inline><img className='shortcuts' alt='logout' src={logoutLight} /><img className='shortcuts' alt='person' src={personLight} /></inline>
                <img className='mainImg' alt='main' src={mainImg} />
                <img className='btnR' alt='btn' src={btn} onClick={goToPageR} />
                <div className='description'>
                    <p className="descriptionText">
                        <h1>그루터기</h1><br />
                        <h2>마음을 울리는 책구절,<br />인상에 남는 한 줄을 적어보세요.</h2><br />
                        <h5>지식과 지혜를 쌓는 공간, 그루터기에서는 독서를 하고 난 뒤, 책의 인상깊은 구절을 통해 서로의 경험과 지식을 공유하고 나누는 곳입니다. 그루터기에서는 책에서 온 통찰력이 우리를 밝은 세계로 안내합니다.<br /><br />여러분의 다양한 관점과 경험을 소중히 여기며, 책을 통해 이룬 인생의 여정을 함께 나눕니다. 그루터기와 함께하는 모두가 지식의 씨앗을 뿌리고 자라나길 바랍니다.</h5>
                    </p>
                </div>
            </div>
            <div className="form">
                <center>
                    <div className="descriptionPhrase">
                        <h1>인상 깊은 구절</h1>
                        <h5>최근 독서를 하면서 다른 사람들과 공유하고 싶었던<br /> 마음에 남는 구절을 작성해 주세요</h5>
                    </div>
                </center>
                <div className='contentWrap'>
                    <div className='inputWrap'>
                        <input 
                        className='input'
                        value={title}
                        placeholder='책의 제목을 입력해 주세요'
                        onChange={handleTitle} />
                    </div>

                    <div className='inputWrap'>
                        <input 
                        className='input'
                        value={writer}
                        placeholder='책의 작가를 입력해 주세요'
                        onChange={handleWriter} />
                    </div>

                    <div className='inputTextWrap'>
                        <textarea 
                        className='inputText'
                        value={phrase}
                        placeholder='인상 깊었던 구절을 200자 이내로 작성해주세요.'
                        onChange={handlePhrase} />
                    </div>

                    <div className='inputTextWrap2'>
                        <textarea 
                        className='inputText2'
                        value={reason}
                        placeholder='해당 구절이 인상 깊었던 이유를 300자 이내로 작성해 주세요.'
                        onChange={handleReason} />
                    </div>

                    <div>
                        <button onClick={onClickConfirmButton}
                        disabled={notAllow}
                        className='bottomButton'>
                            확인
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WriteImpression;