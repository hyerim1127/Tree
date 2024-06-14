import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import './pwModal.css';

const User = {
  email: 'test@example.com',
  pw: 'test123@@@'
};

const ModalPwChange = ({ onClose }) => {
  const navigate = useNavigate();
  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [newPwValid, setNewPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');

  // Check for initial step validation
  useEffect(() => {
    if (emailValid && pwValid) {
      setNotAllow(false);
    } else {
      setNotAllow(true);
    }
  }, [emailValid, pwValid]);

  // Check for new password step validation
  useEffect(() => {
    if (newPwValid && newPw === confirmPw && newPw !== '' && confirmPw !== '') {
      setNotAllow(false);
    } else {
      setNotAllow(true);
    }
  }, [newPw, confirmPw, newPwValid]);

  const handleEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
    const regex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    setEmailValid(regex.test(value));
  };

  const handlePw = (e) => {
    const value = e.target.value;
    setPw(value);
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-Z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    setPwValid(regex.test(value));
  };

  const handleNewPw = (e) => {
    const value = e.target.value;
    setNewPw(value);
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-Z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    setNewPwValid(regex.test(value));
  };

  const handleConfirmPw = (e) => {
    setConfirmPw(e.target.value);
  };

  const handleNextStep = () => {
    if (step === 1 && email === User.email && pw === User.pw) {
      setStep(2);
      setNotAllow(true);  // Disable button initially on step 2
    } else {
      alert('로그인 실패');
    }
  };

  const handlePasswordChange = () => {
    if (newPw === confirmPw) {
      onClose();
      navigate("/");
    } else {
      alert("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
    }
  };

  return (
    <div className="pw-modal">
      <div className="pw-modal-content">
        <span className="pw-modal-close" onClick={onClose}>&times;</span>
        {step === 1 && (
          <div className="auth-step">
            <h2 style={{ marginLeft: "25px" }}>본인 인증</h2>
            <br />
            <h6>비밀번호를 변경하기 전,
              <br />본인 인증을 먼저 진행해주세요.</h6>
            <br />
            <div className='pw-contentWrap'>
              <div className='pw-inputWrap'>
                <input
                  className='pw-input'
                  placeholder='email'
                  value={email}
                  onChange={handleEmail} />
              </div>
              <div className='pw-errorMessageWrap'>
                {!emailValid && email.length > 0 && (
                  <div>올바른 이메일을 입력해주세요.</div>
                )}
              </div>

              <div className='pw-inputWrap'>
                <input
                  type='password'
                  className='pw-input'
                  placeholder='password'
                  value={pw}
                  onChange={handlePw} />
              </div>

              <div className='pw-errorMessageWrap'>
                {!pwValid && pw.length > 0 && (
                  <div>영문, 숫자, 특수문자 포함 9자 이상 입력해주세요.</div>
                )}
              </div>
              <button className="pw-bottomButton" onClick={handleNextStep} disabled={notAllow}>본인인증</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="password-change-step">
            <h2 style={{ marginLeft: "25px" }}>비밀번호 변경</h2>
            <br />
            <h6>새로운 비밀번호를 입력해주세요</h6>
            <br />
            <br />

            <div className='pw-contentWrap'>
              <div className='pw-inputWrap'>
                <input
                  type='password'
                  className='pw-input'
                  placeholder='새 비밀번호'
                  value={newPw}
                  onChange={handleNewPw} />
              </div>
              <div className='pw-errorMessageWrap'>
                {!newPwValid && newPw.length > 0 && (
                  <div>영문, 숫자, 특수문자 포함 9자 이상 입력해주세요.</div>
                )}
              </div>
              <div className='pw-inputWrap'>
                <input
                  type='password'
                  className='pw-input'
                  placeholder='비밀번호 확인'
                  value={confirmPw}
                  onChange={handleConfirmPw} />
              </div>
            </div>
            <br />
            <button onClick={handlePasswordChange} className="pw-bottomButton" disabled={notAllow}>비밀번호 변경</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalPwChange;
