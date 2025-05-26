// React 불러오기
import React, { useState } from 'react';
// CSS 파일 불러오기
import './FindId.css';
// 페이지 이동을 위한 useNavigate 불러오기
import { useNavigate } from 'react-router-dom';
// API 서비스 불러오기
import { findUserId } from '../../services/authService';

// 아이디 찾기 화면 컴포넌트
function FindId() {
  const navigate = useNavigate();

  // 상태 관리
  const [formData, setFormData] = useState({
    contact: '',
    studentId: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // 입력값 변경 처리
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 아이디 찾기 폼 제출 시 DB 연결
  const handleFindId = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      // API 호출
      const response = await findUserId(formData);
      
      if (response.success) {
        // 아이디 찾기 성공
        setResult({
          success: true,
          username: response.username,
          fullUsername: response.fullUsername
        });
      } else {
        // 아이디 찾기 실패
        setResult({
          success: false,
          message: response.message
        });
      }
    } catch (error) {
      console.error('아이디 찾기 처리 오류:', error);
      setResult({
        success: false,
        message: '아이디 찾기 중 오류가 발생했습니다.'
      });
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
        <h1 className="welcome-title">아이디 찾기</h1>
        <p className="welcome-subtitle">가입 시 사용한 정보로 아이디를 찾을 수 있습니다.</p>

        {/* 결과 표시 영역 */}
        {result && (
          <div style={{ 
            padding: '15px', 
            marginBottom: '20px', 
            borderRadius: '8px',
            backgroundColor: result.success ? '#d4edda' : '#f8d7da',
            border: `1px solid ${result.success ? '#c3e6cb' : '#f5c6cb'}`,
            color: result.success ? '#155724' : '#721c24'
          }}>
            {result.success ? (
              <div>
                <strong>아이디를 찾았습니다!</strong><br />
                <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
                  {result.username}
                </span>
                <div style={{ marginTop: '10px', fontSize: '14px' }}>
                  전체 아이디: {result.fullUsername}
                </div>
              </div>
            ) : (
              <div>
                <strong>아이디를 찾을 수 없습니다.</strong><br />
                {result.message}
              </div>
            )}
          </div>
        )}

        {/* 아이디 찾기 폼 */}
        <form className="login-form" onSubmit={handleFindId}> {/* 기존 폼 스타일 재활용 */}
          {/* 정보 입력 (이메일) */}
          <div className="input-group"> {/* 기존 입력 그룹 스타일 재활용 */}
            <label htmlFor="contact">이메일</label>
            <input 
              type="email" 
              id="contact" 
              name="contact" 
              value={formData.contact}
              onChange={handleInputChange}
              placeholder="가입시 사용한 이메일을 입력하세요"
              required 
            />
          </div>
          
          {/* 학번 입력 필드 추가 */}
          <div className="input-group"> {/* 기존 입력 그룹 스타일 재활용 */}
            <label htmlFor="studentId">학번</label>
            <input 
              type="text" 
              id="studentId" 
              name="studentId" 
              value={formData.studentId}
              onChange={handleInputChange}
              placeholder="학번을 입력하세요"
              required 
            />
          </div>

          {/* 아이디 찾기 버튼 */}
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? '찾는 중...' : '아이디 찾기'}
          </button> {/* 기존 로그인 버튼 스타일 재활용 */}
        </form>

        {/* 결과가 있을 때만 추가 버튼들 표시 */}
        {result && result.success && (
          <div className="extra-links" style={{ marginTop: '20px' }}>
            <button 
              type="button" 
              className="link-button" 
              onClick={() => navigate('/login')}
              style={{ 
                backgroundColor: '#007bff', 
                color: 'white', 
                padding: '10px 20px', 
                borderRadius: '5px',
                marginRight: '10px'
              }}
            >
              로그인하기
            </button>
            <button 
              type="button" 
              className="link-button" 
              onClick={() => navigate('/findpassword')}
            >
              비밀번호 찾기
            </button>
          </div>
        )}

        {/* 로그인 페이지로 돌아가기 링크 */}
        <div className="extra-links"> {/* 기존 추가 링크 영역 스타일 재활용 */}
          <button type="button" className="link-button" onClick={() => navigate('/login')}>로그인 페이지로 돌아가기</button>
        </div>
      </div>
    </div>
  );
}

// 내보내기
export default FindId; 