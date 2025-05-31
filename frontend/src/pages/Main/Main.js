// React 라이브러리를 import. 화면을 만들 때 사용
import React from 'react';
// 이 파일에서 쓸 CSS(디자인) 파일을 import
import './Main.css';
// Context와 라우터 import
import { useAppContext } from '../DataContext';
import { useNavigate, Link } from 'react-router-dom';

// Main 컴포넌트 함수 생성. 메인(홈) 화면 역할
function Main() {
  const { isLoggedIn, user } = useAppContext();
  const navigate = useNavigate();

  // 화면에 출력할 JSX 반환
  return (
    <div className="page-container">
      <div className="Main">
        <h2>MyongJiMon에 오신 것을 환영합니다!</h2>
        <p>명지대학교 학생들을 위한 커뮤니티 플랫폼입니다.</p>
        <p>로그인하여 다양한 서비스를 이용해보세요.</p>
        <Link to="/login">
          <button>로그인하러 가기</button>
        </Link>
      </div>
    </div>
  );
}

// Main 컴포넌트를 export. 다른 파일에서 사용 가능
export default Main; 