// 버튼을 출력하는 재사용 컴포넌트
import React from 'react';

// props로 전달받은 내용을 버튼에 출력
function Button({ children, ...props }) {
  return (
    <button {...props}>{children}</button>
  );
}

// Button 컴포넌트를 export. 다른 파일에서 사용 가능
export default Button; 