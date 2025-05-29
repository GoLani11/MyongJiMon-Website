// Schedule.jsx
import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';  // 서버 통신을 위해 axios 추가

// PNG 내보내기 관련 import
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
  const today = new Date();                             // 현재 날짜, 시간 정보 가져오기
  const year = today.getFullYear();                     // 연도 추출
  const month = today.getMonth() + 1;                   // 월 추출
  const semester = (month >= 1 && month <= 6) ? 1 : 2;  // 1~6월은 1학기, 7~12월은 2학기
  return `${year}년 ${semester}학기`;                    // 문자열로 반환
}

// Schedule 정의
function Schedule() {
  // 학기 텍스트를 getCurrentSemester를 통해서 계산 후 변수에 저장
  const semesterLabel = getCurrentSemester();
  // PNG 내보내기를 위한 캡처 대상 DOM 참조 생성
  const captureRef = useRef();
  // 시간표 변경 Modal창 표시 여부 상태
  const [showModal, setShowModal] = useState(false);
  // timetable 상태 정의 - 서버에서 받아올 시간표 데이터 저장
  const [timetable, setTimetable] = useState([]);

  // 서버에서 시간표 데이터를 비동기적으로 불러오는 함수 fetchTimetable 정의
  const fetchTimetable = async () => {
    console.log('fetchTimetable 호출됨'); // 디버깅용 로그
    try {
      // GET 요청으로 시간표 데이터 가져오기(1은 test용 ID -> 사용자 별로 바꿀 때 이 부분 바꿀 것)
      const response = await axios.get('/api/timetable/1');
      console.log('응답 데이터:', response.data); // 응답 데이터 로그
      // 시간표 상태에 응답 데이터 저장
      setTimetable(response.data);
    } catch (error) {
      console.error('시간표 불러오기 실패', error); // 오류 로그
    }
  };

  // 컴포넌트가 마운트(처음 렌더링)될 때 시간표 데이터 불러오기
  useEffect(() => {
    fetchTimetable(); // 서버로부터 시간표 불러오기 호출
  }, []); // 빈 의존성 배열로, 최초 렌더링 시 한 번만 실행

  // PNG로 시간표 내보내는 함수 handleExportPNG 정의
  const handleExportPNG = () => {
    if (!captureRef.current) return;  // 캡처 대상이 없으면 함수 종료
    html2canvas(captureRef.current).then((canvas) => {  // 캡처 진행 후 canvers 객체 반환
      const link = document.createElement('a');   // <a> 엘리먼트를 생성하여 다운로드 링크 역할
      const semester = getCurrentSemester().replace('년 ', '_');  // 파일 이름용 학기 문자열 가공
      link.download = `${semester}_시간표.png`;    // 다운로드 파일 이름 지정
      link.href = canvas.toDataURL('image/png');  // 캡처한 캔버스를 PNG로 변환하여 링크 href 지정
      link.click();                               // 링크 클릭 이벤트를 강제로 발생시켜 다운로드 실행
    });
  };

  return (
    <>
      {/* 페이지 상단 헤더 컴포넌트*/}
      <Header />
      <div className="sidebar-wrapper">
        <div className="sidebar-trigger" /> {/* 사이드바 열기 트리거 */}
        <Sidebar /> {/* 사이드바 컴포넌트 */}
      </div>
      <div className="main-layout">
        {/* 왼쪽 섹션 - 버튼 목록 */}
        <div className="left-section">
          <div className="schedule-buttons-vertical">
            <div className="semester-label">{semesterLabel}</div> {/* 학기 텍스트 표시 */}
            <ScheduleButton onClick={() => setShowModal(true)}>시간표 변경하기</ScheduleButton> {/* 시간표 변경 modal창 열기 버튼 */}
            <ScheduleButton onClick={handleExportPNG}>시간표 내보내기(PNG)</ScheduleButton>     {/* PNG 내보내기 버튼 */}
            <ScheduleButton>친구 추가하기</ScheduleButton>                                      {/* 친구 추가 버튼 - 추후 개발 */}
            <ScheduleButton>내 친구 시간표 확인하기</ScheduleButton>                             {/* 친구 시간표 확인 버튼 - 추후 개발 */}
          </div>
        </div>

        {/* 중앙 섹션 - 나의 시간표 */}
        <div className="center-section">
          <div className="schedule-container" ref={captureRef}> {/* PNG로 시간표 내보내는 영역 지정 */}
            <h2 className="board-title">📅 나의 시간표</h2>      {/* 제목 표시 */}
            <ScheduleTable timetable={timetable} />             {/* 시간표 테이블 컴포넌트에 timetable 데이터 전달 */}
          </div>
        </div>

        {/* 오른쪽 섹션 - 사이드바 위젯젯 */}
        <div className="right-section">
          <SidebarWidget /> {/* 오른쪽 위젯 컴포넌트 */}
        </div>
      </div>

      {/* 하단 네비게이션 */}
      <BottomNav />

      {/* 시간표 변경하기 modal창 조건부 렌더링 - showModal이 true일 때 모달창 ㅍ표시*/}
      {showModal && (
        <ScheduleChangeModal
          onClose={() => setShowModal(false)} // modal 닫기 시 상태 업데이트
          onUpdate={fetchTimetable}           // 시간표 갱신 함수 전달
        />
      )}
    </>
  );
}

export default Schedule;
