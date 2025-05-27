// React 불러오기
import React, { useState } from 'react';
// CSS 파일 불러오기
import './FindPassword.css';
// 페이지 이동을 위한 useNavigate 불러오기
import { useNavigate } from 'react-router-dom';
// 비밀번호 찾기 API 함수 불러오기
import { findPassword } from '../../services/authService';

// 비밀번호 찾기 화면 컴포넌트
function FindPassword() {
  const navigate = useNavigate();

  // 상태 관리
  const [formData, setFormData] = useState({
    username: '',
    contact: '',
    studentId: ''
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  // 입력값 변경 처리
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // 입력할 때 에러 메시지 지우기
    if (error) {
      setError('');
    }
    if (result) {
      setResult(null);
    }
  };

  // 비밀번호 찾기 폼 제출 처리
  const handleFindPassword = async (e) => {
    e.preventDefault();
    
    // 입력값 검증
    if (!formData.username || !formData.contact || !formData.studentId) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      // API 호출
      const response = await findPassword(formData);
      
      if (response.success) {
        setResult({
          success: true,
          message: response.message,
          password: response.fullPassword // 실제 비밀번호 표시 (교육용)
        });
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container"> {/* 기존 로그인/회원가입 컨테이너 스타일 재활용 */}
      <div className="login-box"> {/* 기존 로그인/회원가입 상자 스타일 재활용 */}
        {/* 로고 */}
        <div className="logo-placeholder"></div>

        {/* 제목 */}
        <h1 className="welcome-title">비밀번호 찾기</h1>
        <p className="welcome-subtitle">가입 시 사용한 정보로 비밀번호를 찾을 수 있습니다.</p>

        {/* 결과 표시 영역 */}
        {result && result.success && (
          <div className="success-message">
            <p>{result.message}</p>
            <div className="password-result">
              <strong>비밀번호: {result.password}</strong>
            </div>
            <button 
              type="button" 
              className="login-button"
              onClick={() => navigate('/login')}
              style={{ marginTop: '10px' }}
            >
              로그인 페이지로 이동
            </button>
          </div>
        )}

        {/* 에러 메시지 표시 */}
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {/* 비밀번호 찾기 폼 */}
        {!result && (
          <form className="login-form" onSubmit={handleFindPassword}> {/* 기존 폼 스타일 재활용 */}
            {/* 아이디 입력 */}
            <div className="input-group"> {/* 기존 입력 그룹 스타일 재활용 */}
              <label htmlFor="username">아이디</label>
              <input 
                type="text" 
                id="username" 
                name="username" 
                value={formData.username}
                onChange={handleInputChange}
                disabled={loading}
                required 
              />
            </div>

            {/* 이메일 입력 */}
            <div className="input-group"> {/* 기존 입력 그룹 스타일 재활용 */}
              <label htmlFor="contact">이메일</label>
              <input 
                type="email" 
                id="contact" 
                name="contact" 
                value={formData.contact}
                onChange={handleInputChange}
                disabled={loading}
                placeholder="example@email.com"
                required 
              />
            </div>

            {/* 학번 입력 필드 */}
            <div className="input-group"> {/* 기존 입력 그룹 스타일 재활용 */}
              <label htmlFor="studentId">학번</label>
              <input 
                type="text" 
                id="studentId" 
                name="studentId" 
                value={formData.studentId}
                onChange={handleInputChange}
                disabled={loading}
                placeholder="20241234"
                required 
              />
            </div>
            
            {/* 비밀번호 찾기 버튼 */}
            <button 
              type="submit" 
              className="login-button"
              disabled={loading}
            >
              {loading ? '찾는 중...' : '비밀번호 찾기'}
            </button>
          </form>
        )}

        {/* 로그인 페이지로 돌아가기 링크 */}
        <div className="extra-links"> {/* 기존 추가 링크 영역 스타일 재활용 */}
          <button 
            type="button" 
            className="link-button" 
            onClick={() => navigate('/login')}
            disabled={loading}
          >
            로그인 페이지로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}

// 내보내기
export default FindPassword; 