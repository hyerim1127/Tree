import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Description from '../component/Description';
import logo from '../img/treelogo.png';
import axios from 'axios';
import './loginSignUp.css';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [pwConfirm, setPwConfirm] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);
    const [emailError, setEmailError] = useState('');

    const duplicateEmail = () => {
        axios.get(`http://localhost:8081/member/check-email`, {
            params: { email: email }
        })
          .then((res) => {
              if (res.data) {
                  setEmailError('이메일이 이미 사용 중입니다.');
              } else {
                  setEmailError('이메일을 사용할 수 있습니다.');
              }
          })
          .catch((err) => {
              console.error('Email check ERROR: ', err);
              setEmailError('서버와의 통신 중 오류가 발생했습니다.');
          });
    }

    useEffect(() => {
        if (emailValid && pwValid) {
            setNotAllow(false);
            return;
        }
        setNotAllow(true);
    }, [emailValid, pwValid]);

    const handleEmail = (e) => {
        const value = e.target.value;
        setEmail(value);
        const regex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        setEmailValid(regex.test(value));
    }

    const handlePw = (e) => {
        const value = e.target.value;
        setPw(value);
        const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\$begin:math:text$\\$end:math:text$\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
        setPwValid(regex.test(value));
    }

    const handlePwConfirm = (e) => {
        setPwConfirm(e.target.value);
    }

    const onClickConfirmButton = () => {
        if (pw !== pwConfirm) {
            alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
            return;
        }
        axios.post('http://localhost:8081/member/save', {
            memberEmail: email,
            memberPassword: pw
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
          .then((res) => {
              if (res.status === 201) {
                  navigate('/member/login');
              } else {
                  alert('회원가입에 실패했습니다.');
              }
          })
          .catch(err => {
              console.error('Sign up ERROR: ', err);
              alert('서버와의 통신 중 오류가 발생했습니다.');
          });
    }

    const navigate = useNavigate();
    const goToLogin = () => {
        navigate('/');
    };

    return (
      <div className='page'>
          <Description />
          <form method="post" className='form'>

              <center>
                  <button className="backBtn" onClick={goToLogin}>
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
                      <button className='duplicationCheck' type="button" onClick={duplicateEmail}>중복확인</button>
                  </div>
                  <div className='errorMessageWrap'>
                      {emailError && (
                        <div>{emailError}</div>
                      )}
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
                  <div className='ls-inputWrap'>
                      <input
                        type='password'
                        className='input'
                        placeholder='password confirm'
                        value={pwConfirm}
                        onChange={handlePwConfirm} />
                  </div>
                  <div>
                      <button type="button" onClick={onClickConfirmButton} disabled={notAllow} className='bottomButton'>
                          회원가입
                      </button>
                  </div>
              </div>
          </form>
      </div>
    )
}
export default SignUp;