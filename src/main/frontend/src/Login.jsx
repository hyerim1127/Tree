import React, { useEffect, useState } from "react";
import logo from './img/treelogo.png';
import mainImg from './img/mainImage.png';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const User = {
    email: '',
    pw: ''
};

export default function Login() {
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');

    const [emailValid, setEmailValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

    const loginHandler = (email, pw) => {
        localStorage.setItem("isLoggedIn", "1");
    };

    useEffect(() => {
        const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");
        if (storedUserLoggedInInformation === "1") {
            setIsLoggedIn(true);
        }
    }, []);

    useEffect(() => {
        if (emailValid && pwValid) {
            setNotAllow(false);
            return;
        }
        setNotAllow(true);
    }, [emailValid, pwValid]);

    const handleEmail = (e) => {
        setEmail(e.target.value);
        const regex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        setEmailValid(regex.test(e.target.value));
    };

    const handlePw = (e) => {
        setPw(e.target.value);
        const regex = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
        setPwValid(regex.test(e.target.value));
    };

    const onClickConfirmButton = () => {
        if (email.trim() === '' || pw.trim() === '') {
            alert('id 또는 pw 확인');
            window.location.href = '/';
        } else {
            loginHandler(email, pw);
            console.log('click LOGIN');
            console.log('email:', email);
            console.log('password:', pw);
            setIsLoggedIn(true);
            axios.post('http://localhost:8081/member/login', { // 백엔드 주소
                    memberEmail: email,
                    memberPassword: pw
                }, {
                    withCredentials: true
                })
                .then((res) => {
                    console.log(res);
                    console.log('res.status :: ', res.status);
    
                    if (res.status === 200) {
                        console.log('=====', res.status);
                        navigate('/board/bookSave');
                    } else if (res.status === 204) {
                        console.log('=====', res.status);
                        alert('id 또는 pw 확인');
                        navigate('/');
                    }
                })
                .catch(err => {
                    console.error('Login ERROR: ', err);
                    if (err.response) {
                        if (err.response.status === 504) {
                            alert('서버와의 통신 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
                        } else if (err.response.status === 204) {
                            alert('id 또는 pw 확인');
                        } else {
                            alert('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
                        }
                    } else if (err.request) {
                        alert('서버에 연결할 수 없습니다. 네트워크를 확인해주세요.');
                    } else {
                        alert('예기치 않은 오류가 발생했습니다.');
                    }
                });
        }
    };

    const logoutHandler = () => {
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
    };

    const goToSign = () => {
        navigate("/member/save");
    };

    return (
        <div className='page'>
            <div>
                <img className='mainImg' alt='main' src={mainImg} />
                <div className='description'>
                    <p className="descriptionText">
                        <h1>그루터기</h1><br />
                        <h2>마음을 울리는 책구절,<br />인상에 남는 한 줄을 적어보세요.</h2><br />
                        <h5>지식과 지혜를 쌓는 공간, 그루터기에서는 독서를 하고 난 뒤, 책의 인상깊은 구절을 통해 서로의 경험과 지식을 공유하고 나누는 곳입니다. 그루터기에서는 책에서 온 통찰력이 우리를 밝은 세계로 안내합니다.<br /><br />여러분의 다양한 관점과 경험을 소중히 여기며, 책을 통해 이룬 인생의 여정을 함께 나눕니다. 그루터기와 함께하는 모두가 지식의 씨앗을 뿌리고 자라나길 바랍니다.</h5>
                    </p>
                </div>
            </div>
            <form method="post" action="/member/login" className='form'>
                <center>
                    <button className="backBtn" onClick={logoutHandler}>
                        <img 
                        className='logo'
                        alt='treeImg'
                        src={logo} />
                    </button>
                </center>
                <div className='contentWrap'>
                    <div className='inputWrap'>
                        <input 
                        className='input'
                        placeholder='email'
                        value={email}
                        onChange={handleEmail} />
                    </div>
                    <div className='errorMessageWrap'>
                        {
                            !emailValid && email.length > 0 && (
                                <div>올바른 이메일을 입력해주세요.</div>
                            )
                        }                    
                    </div>

                    <div className='inputWrap'>
                        <input 
                        type='password'
                        className='input'
                        placeholder='password'
                        value={pw}
                        onChange={handlePw} />
                    </div>
                    <div className='errorMessageWrap'>
                        {
                            !pwValid && pw.length > 0 && (
                                <div>영문, 숫자, 특수문자 포함 9자 이상 입력해주세요.</div>
                            )
                        } 
                    </div>
                    <div>
                        <button type="button" onClick={onClickConfirmButton} disabled={notAllow} className='bottomButton'>
                            로그인
                        </button>
                    </div>
                    <div className='joinText'>
                        아직 회원이 아니신가요?
                        <button type="button" className='joinBtn'
                        onClick={goToSign}>회원가입</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
