// ScheduleTable.jsx
import React from 'react';
import '../styles/ScheduleTable.css';

// 요일 배열 정의(시간표의 열 제목)
const days = ['월', '화', '수', '목', '금'];

// 시간 배열 정의(테이블의 행 제목 / 09:00 ~ 19:00까지 표시)
const times = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];

// 샘플 수업 데이터 : 시간표에 들어갈 강의 정보
const sampleSchedule = [
    {
        subject: '프로그래밍응용',  
        day: '화',                  // 요일
        start: '09:00',             // 시작 시간
        end: '11:00',               // 끝나는 시간
        location: '창조관 612',      // 강의실
        color: '#FFD28F',           // 배경 색상
    },
    {
        subject: '게임제작실습1',
        day: '수',
        start: '13:00',
        end: '15:00',
        location: '창조관 601',
        color: '#A7F0BA',
    },
    {
        subject: '컴퓨터디자인',
        day: '수',
        start: '15:00',
        end: '17:00',
        location: '창조관 601',
        color: '#B5C9F8',
    },
    {
        subject: '인터넷통신',
        day: '목',
        start: '09:00',
        end: '11:00',
        location: '창조관 608',
        color: '#E7FFA6',
    },
];

// 수업의 시작~끝 시간 차이를 계산
// 이 값은 테이블에서 병합(rowSpan) 시에 사용
function getDuration(start, end) {
    const startHour = parseInt(start.split(':')[0], 10);    // ex : "13:00" -> 13
    const endHour = parseInt(end.split(':')[0], 10);        // ex : "15:00" -> 15
    return endHour - startHour;                             // ex : 결과 -> 2 = rowSpan
}

// 테이블 전체 컨테이너
function ScheduleTable() {
    return (
        <div className="schedule-table">
            <table>
                {/* 테이블 헤더 부분 */}
                <thead>
                    <tr>
                        {/* 시간 열 헤더 */}
                        <th>시간</th>
                        {days.map((day) => (
                            // 월~금 요일 헤더 자동 렌더링
                            <th key={day}>{day}</th>
                        ))}
                    </tr>
                </thead>

                {/* 테이블 본문 부분 */}
                <tbody>
                    {times.map((time) => (
                        // 각 시간마다 한 줄씩 생성
                        // times 배열을 순회하며 시간 행 생성
                        <tr key={time}>

                            {/* 왼쪽 시간 열 */}
                            <td className="time-label">{time}</td>
                            
                            {/* 요일별 셀 생성 */}
                            {days.map((day) => {
                                // 이 시간대에 시작하는 수업 찾기
                                // classData : 해당 요일, 시간에 수업이 있는지 확인
                                const classData = sampleSchedule.find(
                                    (cls) => cls.day === day && cls.start === time
                                );
                                
                                // 이 시간은 이미 다른 셀(rowSpan) 안에 포함되는가?
                                // isRendered : 이 셀이 이미 윗 셀에 병합되어 있는지 체크 -> 병합된 셀 내부하면 따로 td 만들지 않음
                                const isRendered = sampleSchedule.some(
                                    (cls) =>
                                        cls.day === day &&
                                        cls.start !== time &&
                                        times.indexOf(time) > times.indexOf(cls.start) &&
                                        times.indexOf(time) < times.indexOf(cls.end)
                                );
                                
                                // 이미 병합된 셀 안에 있다면 null 반환 -> 렌더링하지 않음
                                if (isRendered) return null;
                                
                                // 수업이 있는 셀이라면 rowSpan을 적용하여 병합 표시 + 색상 적용
                                if (classData) {
                                    const rowSpan = getDuration(classData.start, classData.end);
                                    return (
                                        <td
                                            key={`${day}-${time}`}
                                            rowSpan={rowSpan}       // 시간 길이만큼 병합
                                            className="time-slot"
                                            style={{ backgroundColor: classData.color }}    // 과목 색상
                                        >
                                            <div className="class-block">
                                                <strong>{classData.subject}</strong>                                    {/* 과목명 */}
                                                <div className="location">{classData.location}</div>                    {/* 강의실 */}
                                                <div className="time-range">{classData.start} ~ {classData.end}</div>   {/* 시간 */}
                                            </div>
                                        </td>
                                    );
                                }

                                // 수업이 없을 경우 빈 칸 반환
                                return <td key={`${day}-${time}`} className="time-slot" />;
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}



export default ScheduleTable;