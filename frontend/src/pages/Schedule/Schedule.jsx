// Schedule.jsx
import React, { useRef } from 'react';

// PNG 내보내기 관련 import
// react의 useRef 사용하기 위해 import
// html2canvas 사용하기 위해 import
import html2canvas from 'html2canvas';

// 상단 헤더, 사이드바, 하단 네비게이션 등 공통 컴포넌트 import
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import SidebarWidget from '../../components/SidebarWidget';
import BottomNav from '../../components/BottomNav';

// 버튼, 시간표 컴포넌트
import ScheduleButton from '../../components/ScheduleButton';
import ScheduleTable from '../../components/ScheduleTable';

// 각 필요 스타일 import
import './Schedule.css';
import '../../styles/layout.css';
import '../../styles/global.css';
import '../../styles/responsive.css';
import '../../styles/ScheduleTable.css';
import '../../styles/ScheduleButton.css';

// 현재 날짜로부터 학기 텍스트를 계산하는 함수
function getCurrentSemester() {
  const today = new Date();
  const year = today.getFullYear();
  // 0부터 시작하므로 +1 보정
  const month = today.getMonth() + 1; 

  const semester = (month >= 1 && month <= 6) ? 1 : 2;

  return `${year}년 ${semester}학기`;
}

function Schedule() {

  // 동적으로 학기 표시하기 위한 변수 선언 및 할당
  const semesterLabel = getCurrentSemester();

  // 시간표 캡처할 요소에 ref 생성
  const captureRef = useRef();

  // PNG로 내보내는 함수
  const handleExportPNG = () => {
    if (!captureRef.current) return;

    html2canvas(captureRef.current).then((canvas) => {
      const link = document.createElement('a');
      const semester = getCurrentSemester().replace('년 ', '_');
      link.download = `${semester}_시간표.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  };

  return (
    <>
      {/* 상단 공통 헤더*/}
      <Header />

      {/* 좌측 사이드바 (hover 시 확장)*/}
      <div className="sidebar-wrapper">
        <div className="sidebar-trigger" />
        <Sidebar />
      </div>

      {/* 메인 레이아웃 : 좌측 (학기 + 버튼), 우측 시간표, 위젯*/}
      <div className="main-layout">

        {/* 좌측: 학기 + 버튼 그룹*/}
        <div className="schedule-buttons-vertical">
          {/* 학기 */}
          <div className="semester-label">{semesterLabel}</div>
          {/* 버튼 그룹 */}
          <ScheduleButton>시간표 변경하기</ScheduleButton>
          <ScheduleButton onClick={handleExportPNG}>시간표 내보내기(PNG)</ScheduleButton>
          <ScheduleButton>친구 추가하기</ScheduleButton>
          <ScheduleButton>내 친구 시간표 확인하기</ScheduleButton>
        </div>

        {/* 우측: 시간표 + 위젯 */}
        <div className="schedule-content">
          {/* 우측 : 시간표*/}
          <div className="schedule-container" ref={captureRef}>
            <h2 className="board-title">📅 나의 시간표</h2>
            <ScheduleTable />
          </div>
          {/* 우측 위젯 : 현재 일정, 다음 일정, 인기 검색어 */}
          <SidebarWidget />
        </div>
      </div>

      {/* 하단 모바일 전용 내비게이션 */}
      <BottomNav />
    </>
  );
}

export default Schedule;