// React 불러오기
import React, { useState } from 'react';
// CSS 파일 불러오기
import './Register.css';
// 페이지 이동을 위한 useNavigate 불러오기
import { useNavigate } from 'react-router-dom';
// API 서비스 불러오기
import { registerUser, checkUsername } from '../../services/authService';

// 회원가입 화면 컴포넌트
function Register() {
  const navigate = useNavigate();

  // 상태 관리
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    email: '',
    studentId: ''
  });
  const [loading, setLoading] = useState(false);
  const [usernameChecked, setUsernameChecked] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(false);

  // 입력값 변경 처리
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // 아이디 입력이 변경되면 중복확인 초기화
    if (name === 'username') {
      setUsernameChecked(false);
      setUsernameAvailable(false);
    }
  };

  // 아이디 중복 확인
  const handleCheckUsername = async () => {
    if (!formData.username.trim()) {
      alert('아이디를 입력해주세요.');
      return;
    }

    try {
      const result = await checkUsername(formData.username);
      if (result.success) {
        setUsernameChecked(true);
        setUsernameAvailable(result.available);
        if (result.available) {
          alert('사용 가능한 아이디입니다.');
        } else {
          alert('이미 사용중인 아이디입니다.');
        }
      } else {
        alert(result.message || '중복 확인 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('아이디 중복 확인 오류:', error);
      alert('중복 확인 중 오류가 발생했습니다.');
    }
  };

  // 회원가입 폼 제출 시 DB 연결
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 입력값 검증
    if (!usernameChecked || !usernameAvailable) {
      alert('아이디 중복 확인을 해주세요.');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      setLoading(false);
      return;
    }

    try {
      // API 호출
      const result = await registerUser(formData);
      
      if (result.success) {
        // 회원가입 성공
        alert(result.message);
        navigate('/login');
      } else {
        // 회원가입 실패
        alert(result.message);
      }
    } catch (error) {
      console.error('회원가입 처리 오류:', error);
      alert('회원가입 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
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
            <div style={{ display: 'flex', gap: '10px' }}>
              <input 
                type="text" 
                id="username" 
                name="username" 
                value={formData.username}
                onChange={handleInputChange}
                required 
              />
              <button 
                type="button" 
                onClick={handleCheckUsername}
                style={{ 
                  padding: '8px 12px', 
                  backgroundColor: '#007bff', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '4px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                중복확인
              </button>
            </div>
            {usernameChecked && (
              <span style={{ 
                fontSize: '12px', 
                color: usernameAvailable ? 'green' : 'red' 
              }}>
                {usernameAvailable ? '사용 가능한 아이디입니다.' : '이미 사용중인 아이디입니다.'}
              </span>
            )}
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

          {/* 비밀번호 확인 입력 */}
          <div className="input-group">
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword" 
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required 
            />
            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <span style={{ fontSize: '12px', color: 'red' }}>
                비밀번호가 일치하지 않습니다.
              </span>
            )}
          </div>

          {/* 이름 입력 */}
          <div className="input-group">
            <label htmlFor="name">이름</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name}
              onChange={handleInputChange}
              required 
            />
          </div>

          {/* 이메일 입력 */}
          <div className="input-group">
            <label htmlFor="email">이메일</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleInputChange}
              required 
            />
          </div>
          
          {/* 학번 입력 */}
          <div className="input-group">
            <label htmlFor="studentId">학번</label>
            <input 
              type="text" 
              id="studentId" 
              name="studentId" 
              value={formData.studentId}
              onChange={handleInputChange}
              required 
            />
          </div>

          {/* 회원가입 버튼 */}
          <button type="submit" className="register-button" disabled={loading}>
            {loading ? '회원가입 중...' : '회원가입'}
          </button>
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