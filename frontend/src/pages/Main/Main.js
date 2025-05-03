// React 라이브러리를 import. 화면을 만들 때 사용
import React from 'react';
// 이 파일에서 쓸 CSS(디자인) 파일을 import
import './Main.css';

// Main 컴포넌트 함수 생성. 메인(홈) 화면 역할
function Main() {
  // 화면에 출력할 JSX 반환
  return (
    // Main이라는 className을 가진 div 생성
    <div className="Main">
      {/* "Main Page" 제목 출력 */}
      <h2>홈 페이지</h2>
      {/* 환영 문구 출력 */}
      <p>명지몬 홈페이지 화면 입니다!!!!!</p>
    </div>
  );
}

// Main 컴포넌트를 export. 다른 파일에서 사용 가능
export default Main; 