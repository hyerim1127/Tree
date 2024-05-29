import React, { useState } from 'react';

const ModalPwChange = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleNextStep = () => {
    if (step === 1 && email && password) {
      setStep(2);
    }
  };

  const handlePasswordChange = () => {
    if (newPassword === confirmPassword) {
      // 비밀번호 변경 로직 추가
      onClose();
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        {step === 1 && (
          <div className="auth-step">
            <h2>modalPwChange-사용자 인증</h2>
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleNextStep}>다음</button>
          </div>
        )}
        {step === 2 && (
          <div className="password-change-step">
            <h2>ModalPwChange-비밀번호 변경</h2>
            <input
              type="password"
              placeholder="새 비밀번호"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={handlePasswordChange}>변경</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalPwChange;
