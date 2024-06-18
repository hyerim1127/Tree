// Login.jsx

import React, { useEffect, useState } from "react";
import logo from '../img/treelogo.png';
import Description from '../component/Description';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './loginSignUp.css';

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

    const navigate = useNavigate();

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
            alert('ID 또는 PW를 확인해주세요.');
            return; 
        } else {
            axios.post('http://localhost:8081/member/login', {
                memberEmail: email,
                memberPassword: pw
            }, {
                withCredentials: true
            })
            .then((res) => {
                console.log('res.status :: ', res.status);
    
                if (res.status === 200) {
                    console.log('로그인 성공');
                    localStorage.setItem('userEmail',email);
                    navigate('/board/bookSave');
                } else if (res.status === 204) {
                    console.log('로그인 실패');
                    alert('ID 또는 PW를 확인해주세요.');
                    navigate('/member/login');
                }
            })
            .catch(err => {
                console.error('Login ERROR: ', err);
                alert('서버와의 통신 중 오류가 발생했습니다.');
            });
        }
    };

    const goToSign = () => {
        navigate("/member/save");
    };

    return (
        <div className='page'>
            <Description />
            <form method="post" action="/member/login" className='form'>
                <center>
                    <button className="backBtn">
                        <img 
                        className='logo'
                        alt='treeImg'
                        src={logo} />
                    </button>
                </center>
                <div className='contentWrap'>
                    <div className='ls-inputWrap'>
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

                    <div className='ls-inputWrap'>
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
    );
}
