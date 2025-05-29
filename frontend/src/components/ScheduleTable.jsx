// ScheduleTabel.jsx

import React from 'react';
// ScheduleTable 전용 CSS 파일 불러오기
import '../styles/ScheduleTable.css';

// 요일 배열(테이블의 열 제목으로 사용)
const days = ['월', '화', '수', '목', '금'];
// 시간대 배열(테이블의 행 제목으로 사용)
const times = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];

// 랜덤 색상 생성 함수 getRandomColor 정의 - 같은 course_id는 항상 같은 색을 가지도록
function getRandomColor(course_id) {
    const colors = ['#FFDDC1', '#FFC9DE', '#D0E6A5', '#A5D8FF', '#FFD6A5', '#C1E1FF', '#FEC8D8', '#B5EAD7'];
    return colors[course_id % colors.length];   // course_id로 색 배열에서 색을 선택
}

// HH:MM 형식의 문자열을 분(minute) 단위 숫자로 변환
function timeToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);    // 시와 분으로 분리
    return hours * 60 + minutes;                                // 시를 분 단위로 변환 후 분과 합산
}

// ScheduleTable 컴포넌트 정의
function ScheduleTable({ timetable }) {
    // displayMap : 각 수업(course_id)이 이미 출력되었는지 여부를 저장하는 객체
    const displayMap = {};  // key = course_id, value = true (출력 여부)

    return (
        <div className="schedule-table">    {/* 테이블을 감싸는 div */}
            <table>
                {/* 테이블 헤더 영역 */}
                <thead>
                    <tr>
                        <th>시간</th>                                {/* 첫 번째 열은 시간 표시 */}
                        {days.map(day => <th key={day}>{day}</th>)} {/* 요일을 열 제목으로 출력 */}
                    </tr>
                </thead>
                {/* 테이블 본문 영역 */}
                <tbody>
                    {times.map((time, rowIndex) => (    // 각 시간대에 대해 행 생성
                        <tr key={time}>                             {/* 행의 고유 key로 시간 사용 */}
                            <td className="time-label">{time}</td>  {/* 첫 열에 시간 표시 */}
                            {days.map(day => {          // 각 요일마다 열 생성
                                const currentTime = timeToMinutes(time);    // 현재 시간대를 분으로 계산
                                const timeKey = `${day}-${time}`;           // 열의 고유 key 생성

                                // 현재 시간에 해당하는 수업 찾기
                                const classAtThisTime = timetable.find(cls => {
                                    if (cls.course_day_of_week !== day) return false;                   // 요일이 다르면 제외
                                    const start = timeToMinutes(cls.course_start_time.slice(0, 5));     // 수업 시작시간
                                    const end = timeToMinutes(cls.course_end_time.slice(0, 5));         // 수업 종료시간
                                    return currentTime >= start && currentTime < end;                   // 현재 시간에 포함되는지 확인
                                });

                                if (!classAtThisTime) {
                                    // 이 시간대에 해당하는 수업이 없다면 빈 칸 반환
                                    return <td key={timeKey} className="time-slot"></td>;
                                }

                                // 이미 이 수업을 출력한 경우(null 반환)
                                if (displayMap[classAtThisTime.course_id]) {
                                    return null;    // 중복 출력 방지(rowspan 덕분에)
                                }

                                // rowspan 계산 : 수업이 몇 시간(몇 칸) 차지하는 지 계산
                                const start = timeToMinutes(classAtThisTime.course_start_time.slice(0, 5));
                                const end = timeToMinutes(classAtThisTime.course_end_time.slice(0, 5));
                                const span = Math.ceil((end - start) / 60); // 1시간 단위로 나눔

                                // 해당 course_id 출력 처리
                                displayMap[classAtThisTime.course_id] = true;

                                // 수업 칸 반환 - rowspan 적용 및 스타일 지정
                                return (
                                    <td key={timeKey} className="time-slot" rowSpan={span}>
                                        <div
                                            className="class-block"
                                            style={{ backgroundColor: getRandomColor(classAtThisTime.course_id) }}  // 배경색 지정
                                        >
                                            <strong>{classAtThisTime.course_name}</strong>  {/* 과목명 */}
                                            <div className="location">{classAtThisTime.course_location}</div> {/* 강의실 */}
                                            <div className="time-range">
                                                {classAtThisTime.course_start_time.slice(0, 5)} ~ {classAtThisTime.course_end_time.slice(0, 5)} {/* 시간 범위 */}
                                            </div>
                                        </div>
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ScheduleTable;
