// React 불러오기
import React from 'react';
// CSS 파일 불러오기
import './FindId.css';
// 페이지 이동을 위한 useNavigate 불러오기
import { useNavigate } from 'react-router-dom';

// 아이디 찾기 화면 컴포넌트
function FindId() {
  const navigate = useNavigate();

  // 아이디 찾기 폼 제출 시 (placeholder)
  const handleFindId = (e) => {
    e.preventDefault();
    // 아이디 찾기 로직 추가 필요
    alert('아이디 찾기 기능은 아직 준비중입니다.');
    // navigate('/결과페이지경로'); // 실제 구현 시 결과 페이지로 이동
  };

  return (
    <div className="login-page-container"> {/* 기존 로그인/회원가입 컨테이너 스타일 재활용 */}
      <div className="login-box"> {/* 기존 로그인/회원가입 상자 스타일 재활용 */}
        {/* 로고 */}
        <div className="logo-placeholder"></div>

        {/* 제목 */}
        <h1 className="welcome-title">아이디 찾기</h1>
        <p className="welcome-subtitle">가입 시 사용한 정보로 아이디를 찾을 수 있습니다.</p>

        {/* 아이디 찾기 폼 */}
        <form className="login-form" onSubmit={handleFindId}> {/* 기존 폼 스타일 재활용 */}
          {/* 정보 입력 (예: 이메일 또는 전화번호) */}
          <div className="input-group"> {/* 기존 입력 그룹 스타일 재활용 */}
            <label htmlFor="contact">이메일 또는 전화번호</label>
            <input type="text" id="contact" name="contact" required />
          </div>
          
          {/* 학번 입력 필드 추가 */}
          <div className="input-group"> {/* 기존 입력 그룹 스타일 재활용 */}
            <label htmlFor="student-id">학번</label>
            <input type="text" id="student-id" name="student-id" required />
          </div>

          {/* 아이디 찾기 버튼 */}
          <button type="submit" className="login-button">아이디 찾기</button> {/* 기존 로그인 버튼 스타일 재활용 */}
        </form>

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