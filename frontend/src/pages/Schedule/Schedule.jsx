// Schedule.jsx
import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';  // 서버 통신을 위해 axios 추가
import html2canvas from 'html2canvas';

// 공통 컴포넌트 import
import Header from '../../components/Header.jsx';
import Sidebar from '../../components/Sidebar.jsx';
import SidebarWidget from '../../components/SidebarWidget.jsx';
import BottomNav from '../../components/BottomNav.jsx';

// 버튼, 시간표, 시간표 변경 modal창 컴포넌트
import ScheduleButton from '../../components/ScheduleButton';
import ScheduleTable from '../../components/ScheduleTable';
import ScheduleChangeModal from '../../components/ScheduleChangeModal';

// CSS 스타일 import
import './Schedule.css';
import '../../styles/layout.css';
import '../../styles/global.css';
import '../../styles/responsive.css';
import '../../styles/ScheduleTable.css';
import '../../styles/ScheduleButton.css';

// 현재 날짜로부터 학기 텍스트 계산(ex. "2025년 1학기")
function getCurrentSemester() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const semester = (month >= 1 && month <= 6) ? 1 : 2;
  return `${year}년 ${semester}학기`;
}

// Schedule 컴포넌트
function Schedule() {
  const semesterLabel = getCurrentSemester();  // 동적으로 학기 텍스트
  const captureRef = useRef();  // PNG 내보내기를 위한 캡처 대상 DOM 참조

  const [showModal, setShowModal] = useState(false);  // 모달창 상태
  const [timetable, setTimetable] = useState([]);     // 시간표 데이터 상태

  // 서버에서 시간표 데이터를 불러오는 함수
  const fetchTimetable = async () => {
    console.log('fetchTimetable 호출됨');
    try {
      const response = await axios.get('/api/timetable/1');  // userId=1은 임시, 실제 사용자 ID로 교체 필요
      console.log('응답 데이터:', response.data);
      setTimetable(response.data);
    } catch (error) {
      console.error('시간표 불러오기 실패', error);
    }
  };

  // 컴포넌트가 마운트될 때 fetchTimetable 호출
  useEffect(() => {
    fetchTimetable();
  }, []);

  // PNG 내보내기 처리 함수
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
      {/* 상단 공통 헤더 */}
      <Header />

      {/* 사이드바 */}
      <div className="sidebar-wrapper">
        <div className="sidebar-trigger" />
        <Sidebar />
      </div>

      {/* 메인 레이아웃 */}
      <div className="main-layout">
        {/* 좌측 버튼 섹션 */}
        <div className="left-section">
          <div className="schedule-buttons-vertical">
            <div className="semester-label">{semesterLabel}</div>
            <ScheduleButton onClick={() => setShowModal(true)}>시간표 변경하기</ScheduleButton>
            <ScheduleButton onClick={handleExportPNG}>시간표 내보내기(PNG)</ScheduleButton>
            <ScheduleButton>친구 추가하기</ScheduleButton>
            <ScheduleButton>내 친구 시간표 확인하기</ScheduleButton>
          </div>
        </div>

        {/* 중앙 시간표 섹션 */}
        <div className="center-section">
          <div className="schedule-container" ref={captureRef}>
            <h2 className="board-title">📅 나의 시간표</h2>
            <ScheduleTable timetable={timetable} />
          </div>
        </div>

        {/* 오른쪽 위젯 섹션 */}
        <div className="right-section">
          <SidebarWidget />
        </div>
      </div>

      {/* 하단 네비게이션 */}
      <BottomNav />

      {/* 모달창: showModal 상태가 true일 때만 렌더링 */}
      {showModal && (
        <ScheduleChangeModal
          onClose={() => setShowModal(false)}
          onUpdate={fetchTimetable}
        />
      )}
    </>
  );
}

export default Schedule;
