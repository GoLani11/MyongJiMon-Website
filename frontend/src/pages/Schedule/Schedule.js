// 스케줄 js 페이지 입니다.

// React 불러오기
import React from 'react';
// CSS 파일 불러오기
import './Schedule.css';
// 페이지 이동을 위한 useNavigate 불러오기
import { useNavigate } from 'react-router-dom';

// 스케줄 페이지 컴포넌트
function Schedule() {
  const navigate = useNavigate();

  return (
    <div className="schedule-page-container">
      <div className="schedule-box">
        <div className="schedule-header">
          <h1>스케줄</h1>
        </div>
      </div>
    </div>
  );
}

export default Schedule;
