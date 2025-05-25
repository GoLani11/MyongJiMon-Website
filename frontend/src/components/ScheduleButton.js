// ScheduleButton.js
import React from 'react';
import '../styles/ScheduleButton.css';

// 재사용 가능한 버튼 컴포넌트
// children : 버튼 안에 들어갈 텍스트 또는 아이콘
// onClick : 클릭 이벤트 핸들러
// className : 추가로 전달할 클래스명 
function ScheduleButton({ children, onClick, className = '', ...props }) {
  return (
    // 기본 스타일 .schedule-btn + 추가 클래스 적용
    // {...props} : 버튼에 적용할 수 있는 모든 HTML 속성 추가
    <button onClick={onClick} className={`schedule-btn ${className}`} {...props}>
      {/* 버튼 안에 표시할 실제 내용 */}
      {children}
    </button>
  );
}

export default ScheduleButton;