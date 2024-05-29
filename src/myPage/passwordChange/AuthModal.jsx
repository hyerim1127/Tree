import React, { useState } from 'react';

const AuthModal = ({ onNextStep, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 인증 로직을 추가합니다.
    // 인증에 성공하면 onNextStep을 호출하여 다음 단계로 넘어갑니다.
    onNextStep();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="modal-close" onClick={onClose}>&times;</span>
        <h2>authModal</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">인증</button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
