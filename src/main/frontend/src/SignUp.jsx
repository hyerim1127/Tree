import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Description from './Description';
import logo from './img/treelogo.png';
import axios from 'axios';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [pwConfirm, setPwConfirm] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);

    const navigate = useNavigate();

    const duplicateEmail = (e) => {
        e.preventDefault();
        axios.get(`http://localhost:8081/member/check-email?email=${email}`)
          .then((res) => {
              if (res.data) {
                  alert('이메일 이용 가능^.^');
              } else {
                  alert('이메일 이용 불가능ㅜ.ㅜ');
              }
          })
          .catch(err => {
              console.error('Email check ERROR: ', err);
              alert('서버와의 통신 중 오류가 발생했습니다.');
          });   
    }

    useEffect(() => {
        if(emailValid && pwValid) {
            setNotAllow(false);
        } else {
            setNotAllow(true);
        }
    }, [emailValid, pwValid]);

    const handleEmail = (e) => {
        setEmail(e.target.value);
        const regex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        setEmailValid(regex.test(e.target.value));
    }

    const handlePw = (e) => {
        setPw(e.target.value);
        const regex = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\$begin:math:text$\\$end:math:text$\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
        setPwValid(regex.test(e.target.value));
    }

    const handlePwConfirm = (e) => {
        setPwConfirm(e.target.value);
    }

    const onClickConfirmButton = (e) => {
        e.preventDefault();
        if(email.trim() === '' || pw.trim() === '') {
            alert('올바르게 입력');
            navigate("/member/save");
        } else {
            console.log('email : ', email);
            console.log('pw : ', pw);
            axios.post('http://localhost:8081/member/save', {
                memberEmail: email,
                memberPassword: pw
            }, {
                withCredentials: true
            })
              .then((res) => {
                  console.log('res.status :: ', res.status);
                  if (res.status === 201) {
                      console.log('회원가입 성공');
                      navigate('/member/login');
                  } else {
                      console.log('회원가입 실패');
                      alert('회원가입에 실패했습니다.');
                  }
              })
              .catch(err => {
                  console.error('Signup ERROR: ', err);
                  alert('서버와의 통신 중 오류가 발생했습니다.');
              });

        }
    }

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
                  <div className='inputWrap'>
                      <input
                        className='input'
                        placeholder='email'
                        value={email}
                        onChange={handleEmail} />
                      <button className='duplicationCheck' onClick={duplicateEmail}>중복확인</button>
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
                  <div className='inputWrap'>
                      <input
                        type='password'
                        className='input'
                        placeholder='password confirm'
                        value={pwConfirm}
                        onChange={handlePwConfirm} />
                  </div>
                  <div>
                      <button onClick={onClickConfirmButton}
                              disabled={notAllow}
                              className='bottomButton'>
                          회원가입
                      </button>
                  </div>
              </div>
          </form>
      </div>
    )
}

export default SignUp;