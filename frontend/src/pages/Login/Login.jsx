// React 불러오기
import React, { useState, useEffect } from 'react';
// CSS 파일 불러오기
import './Login.css';
// 페이지 이동을 위한 useNavigate 불러오기
import { useNavigate } from 'react-router-dom';
// API 서비스 불러오기
import { loginUser } from '../../services/authService';
// Context 불러오기
import { useAppContext } from '../DataContext';

// 로그인 화면 컴포넌트
function Login() {
  const navigate = useNavigate();
  const { login } = useAppContext();
  
  // 상태 관리
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // 컴포넌트 마운트 시 기억된 아이디 불러오기
  useEffect(() => {
    const rememberedUsername = localStorage.getItem('rememberedUsername');
    if (rememberedUsername) {
      setFormData(prev => ({
        ...prev,
        username: rememberedUsername
      }));
      setRememberMe(true);
    }
  }, []);

  // 입력값 변경 처리
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 로그인 폼 제출 시 DB 연결
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // API 호출
      const result = await loginUser(formData);
      
      if (result.success) {
        // 로그인 성공
        alert(result.message);
        
        // 아이디 저장 처리
        if (rememberMe) {
          localStorage.setItem('rememberedUsername', formData.username);
        } else {
          localStorage.removeItem('rememberedUsername');
        }
        
        // Context를 통해 사용자 정보 저장
        login(result.user);
        
        // 메인 페이지로 이동
        navigate('/home');
      } else {
        // 로그인 실패
        alert(result.message);
      }
    } catch (error) {
      console.error('로그인 처리 오류:', error);
      alert('로그인 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-box">
        {/* 로고 */}
        <div className="logo-placeholder"></div>

        {/* 환영 메시지 */}
        <h1 className="welcome-title">명지몬에 오신것을 환영합니다.</h1>
        <p className="welcome-subtitle">명지몬은 명지전문대학 학생과 교수를 위한 플랫폼입니다.</p>

        {/* 로그인 폼 */}
        <form className="login-form" onSubmit={handleLogin}>
          {/* 아이디 입력 */}
          <div className="input-group">
            <label htmlFor="username">아이디</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          
          {/* 비밀번호 입력 */}
          <div className="input-group">
            <label htmlFor="password">비밀번호</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* 아이디 저장 */}
          <div className="remember-me">
            <input 
              type="checkbox" 
              id="remember-id" 
              name="remember-id" 
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-id" className="remember-id-label">아이디 저장</label>
          </div>

          {/* 로그인 버튼 */}
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        {/* 아이디/비밀번호 찾기, 회원가입 */}
        <div className="extra-links">
          <button className="link-button" onClick={() => navigate('/findid')}>아이디찾기</button>
          <span className="separator">|</span>
          <button className="link-button" onClick={() => navigate('/findpassword')}>비밀번호찾기</button>
          <span className="separator">|</span>
          <button type="button" className="link-button" onClick={() => navigate('/register')}>회원가입</button>
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