// React 불러오기
import React from 'react';
// CSS 파일 불러오기
import './Login.css';

// 로그인 화면 컴포넌트
function Login() {
  return (
    <div className="login-page-container">
      <div className="login-box">
        {/* 로고 */}
        <div className="logo-placeholder"></div>

        {/* 환영 메시지 */}
        <h1 className="welcome-title">명지몬에 오신것을 환영합니다.</h1>
        <p className="welcome-subtitle">명지몬은 명지전문대학 학생과 교수를 위한 플랫폼입니다.</p>

        {/* 로그인 폼 */}
        <form className="login-form">
          {/* 아이디 입력 */}
          <div className="input-group">
            <label htmlFor="username">아이디</label>
            <input type="text" id="username" name="username" />
          </div>
          
          {/* 비밀번호 입력 */}
          <div className="input-group">
            <label htmlFor="password">비밀번호</label>
            <input type="password" id="password" name="password" />
          </div>

          {/* 아이디 저장 */}
          <div className="remember-me">
            <input type="checkbox" id="remember-id" name="remember-id" />
            <label htmlFor="remember-id" className="remember-id-label">아이디 저장</label>
          </div>

          {/* 로그인 버튼 */}
          <button type="submit" className="login-button">로그인</button>
        </form>

        {/* 아이디/비밀번호 찾기, 회원가입 */}
        <div className="extra-links">
          <button className="link-button">아이디찾기</button>
          <span className="separator">|</span>
          <button className="link-button">비밀번호찾기</button>
          <span className="separator">|</span>
          <button className="link-button">회원가입</button>
        </div>

        {/* SNS 로그인 */}
        <div className="sns-login-section">
          <p className="sns-login-title">SNS 로그인</p>
          <div className="sns-buttons-container">
            {/* 카카오 */}
            <div className="sns-button">
              <div className="sns-icon kakao-icon"></div>
              <span>카카오톡으로 로그인</span>
            </div>
            
            {/* 구글 */}
            <div className="sns-button">
              <div className="sns-icon google-icon"></div>
              <span>Google 로그인</span>
            </div>
            
            {/* 네이버 */}
            <div className="sns-button">
              <div className="sns-icon naver-icon"></div>
              <span>네이버로 로그인</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 내보내기
export default Login;