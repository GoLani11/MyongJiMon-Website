// 입력창을 출력하는 재사용 컴포넌트
import React from 'react';

// props로 전달받은 속성을 input에 적용
function Input(props) {
  return (
    <input {...props} />
  );
}

// Input 컴포넌트를 export. 다른 파일에서 사용 가능
export default Input; 