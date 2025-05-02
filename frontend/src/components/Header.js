// 헤더를 출력하는 재사용 컴포넌트
import React from 'react';

// props로 전달받은 내용을 헤더에 출력
function Header({ title }) {
  return (
    <header style={{ background: '#282c34', color: 'white', padding: '16px', textAlign: 'center' }}>
      <h1>{title}</h1>
    </header>
  );
}

// Header 컴포넌트를 export. 다른 파일에서 사용 가능
export default Header; 