// React 라이브러리를 import. 화면을 만들 때 사용
import React from 'react';
// 이 파일에서 쓸 CSS(디자인) 파일을 import
import './Main.css';
// Context와 라우터 import
import { useAppContext } from '../DataContext';
import { useNavigate } from 'react-router-dom';

// Main 컴포넌트 함수 생성. 메인(홈) 화면 역할
function Main() {
  const { isLoggedIn, user } = useAppContext();
  const navigate = useNavigate();

  // 화면에 출력할 JSX 반환
  return (
    // Main이라는 className을 가진 div 생성
    <div className="Main">
      {/* "Main Page" 제목 출력 */}
      <h2>명지몬 홈페이지</h2>
      
      {isLoggedIn ? (
        // 로그인한 경우
        <div>
          <p>안녕하세요, {user?.nickname || user?.username}님!</p>
          <p>명지몬에 오신 것을 환영합니다.</p>
          <button onClick={() => navigate('/home')}>커뮤니티 홈으로 이동</button>
        </div>
      ) : (
        // 로그인하지 않은 경우
        <div>
          <p>명지몬 홈페이지에 오신 것을 환영합니다!</p>
          <p>로그인하여 더 많은 기능을 이용해보세요.</p>
          <button onClick={() => navigate('/login')}>로그인하기</button>
        </div>
      )}
    </div>
  );
}

// Main 컴포넌트를 export. 다른 파일에서 사용 가능
export default Main; 