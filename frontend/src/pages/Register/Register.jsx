// React 불러오기
import React, { useState } from 'react';
// CSS 파일 불러오기
import './Register.css';
// 페이지 이동을 위한 useNavigate 불러오기
import { useNavigate } from 'react-router-dom';
// API 서비스 불러오기
import { registerUser } from '../../services/authService';

// 회원가입 화면 컴포넌트
function Register() {
  const navigate = useNavigate();

  // 회원가입 폼 제출 시 (일단 로그인 페이지로 이동하도록 설정)
  const handleRegister = (e) => {
    e.preventDefault();
    // 실제 회원가입 로직 추가 필요
    alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
    navigate('/login');
  };

  return (
    <div className="register-page-container">
      <div className="register-box">
        {/* 로고 (로그인 페이지와 동일한 placeholder 사용) */}
        <div className="logo-placeholder"></div>

        {/* 환영 메시지 */}
        <h1 className="welcome-title">회원가입</h1>
        <p className="welcome-subtitle">명지몬 계정을 만들어 보세요.</p>

        {/* 회원가입 폼 */}
        <form className="register-form" onSubmit={handleRegister}>
          {/* 아이디 입력 */}
          <div className="input-group">
            <label htmlFor="username">아이디</label>
            <input type="text" id="username" name="username" required />
          </div>
          
          {/* 비밀번호 입력 */}
          <div className="input-group">
            <label htmlFor="password">비밀번호</label>
            <input type="password" id="password" name="password" required />
          </div>

          {/* 비밀번호 확인 입력 */}
          <div className="input-group">
            <label htmlFor="confirm-password">비밀번호 확인</label>
            <input type="password" id="confirm-password" name="confirm-password" required />
          </div>

          {/* 이름 입력 */}
          <div className="input-group">
            <label htmlFor="name">이름</label>
            <input type="text" id="name" name="name" required />
          </div>

          {/* 이메일 입력 */}
          <div className="input-group">
            <label htmlFor="email">이메일</label>
            <input type="email" id="email" name="email" required />
          </div>
          
          {/* 학번 입력 */}
          <div className="input-group">
            <label htmlFor="student-id">학번</label>
            <input type="text" id="student-id" name="student-id" required />
          </div>

          {/* 회원가입 버튼 */}
          <button type="submit" className="register-button">회원가입</button>
        </form>

        {/* 이미 계정이 있으신가요? */}
        <div className="extra-links">
          <span>이미 계정이 있으신가요? </span>
          <button className="link-button" onClick={() => navigate('/login')}>로그인</button>
        </div>
      </div>
    </div>
  );
}

// 내보내기
export default Register; 