// React 라이브러리를 import. 화면을 만들 때 사용
import React from 'react';
// 이 파일에서 쓸 CSS(디자인) 파일을 import
import './Login.css';

// Login 컴포넌트 함수 생성. 로그인 화면 역할
function Login() {
  // 화면에 출력할 JSX 반환
  return (
    // Login이라는 className을 가진 div 생성
    <div className="Login">
      {/* "Login" 제목 출력 */}
      <h2>로그인 화면</h2>
      {/* 로그인 폼(form) 생성 */}
      <form>
        {/* 아이디 입력칸(input) 생성 */}
        <input type="text" placeholder="아이디" />
        {/* 비밀번호 입력칸(input) 생성 */}
        <input type="password" placeholder="비밀번호" />
        {/* 로그인 버튼 생성 */}
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

// Login 컴포넌트를 export. 다른 파일에서 사용 가능
export default Login; 