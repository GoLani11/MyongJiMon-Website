// ScheduleChangeModal.jsx

// React에서 useEffect, useState를 가져옴(비동기 데이터 처리 및 상태 관리용)
import React, { useEffect, useState } from 'react';
// axios를 풀러옴(서버와의 HTTP 통신 위해서)
import axios from 'axios';
// toastify를 불러옴(알림 메시지 출력용)
import { toast } from 'react-toastify';
// toastify의 기본 스타일 import
import 'react-toastify/dist/ReactToastify.css';
// ScheduleChangeModal 전용 CSS import
import '../styles/ScheduleChangeModal.css';

// ScheduleChangeModal 컴포넌트 정의
// props : onClose(모달 닫기), onUpdate(시간표 갱신)
function ScheduleChangeModal({ onClose, onUpdate }) {   // ✅ onUpdate 추가
  // 과목 목록 상태 초기화
  const [courses, setCourses] = useState([]);

  // 컴포넌트가 마운트될 때 과목 목록을 불러오기(한 번만 실행)
  useEffect(() => {
    axios.get('/api/courses')                                           // 서버에서 과목 목록을 GET 요청
      .then((response) => setCourses(response.data))                    // 응답 데이터로 상태 업데이트
      .catch((error) => console.error('과목 목록 불러오기 실패', error));  // 에러 처리
  }, []);   // 의존성 배열 비어있음 : 최초 렌더링 시 한 번만 실행

  // 시간표에 과목 추가하는 함수 handleAddCourse 정의
  const handleAddCourse = (courseId) => {
    const userId = 1; // 사용자 ID(현재는 1로 고정 -> 나중에 수정 필요)
    const currentYear = new Date().getFullYear(); // 현재 연도
    const currentSemester = (new Date().getMonth() + 1) <= 6 ? '1학기' : '2학기';  // 현재 학기(문자열)
    axios.post('/api/timetable', {  // POST 요청으로 시간표에 과목 추가
      user_id: userId,              // 사용자 ID
      course_id: courseId,          // 추가할 과목 ID
      tt_year: currentYear,         // 연도
      tt_semester: currentSemester  // 학기
    })
      .then(() => {
        toast.success('시간표에 추가 완료!'); // 성공 알림 toast 메시지 출력
        if (onUpdate) onUpdate();   // 시간표 갱신 함수 호출(부모에게 전달)
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {  // 이미 추가된 경우
          toast.warn('이미 시간표에 있습니다!');  // 중복 오류 로그
        } else {
          toast.error('추가 중 오류 발생!');  // 기타 오류 로그
        }
      });
  };

  // 시간표에서 과목 삭제하는 함수 handleDeleteCourse 정의
  const handleDeleteCourse = (courseId) => {
    const userId = 1; // 사용자 ID(현재는 1로 고정 -> 나중에 수정 필요)
    axios.delete(`/api/timetable/${userId}/${courseId}`)  // DELETE 요청으로 시간표에서 삭제
      .then(() => {
        toast.success('시간표에서 삭제 완료!'); // 성공 알림 출려
        if (onUpdate) onUpdate();            // 삭제 후 시간표 갱신
      })
      .catch(() => toast.error('삭제 실패')); // 실패 시 알림
  };

  return (
    <div className="modal-overlay"> {/* modal 전체를 감싸는 반투명 배경 */}
      <div className="modal-content"> {/* 모단 실제 내용 영역 */}
        <h2>시간표 변경하기</h2>      {/* 모달 제목 */}
        <table className="course-table">  {/* 과목 목록 테이블 */}
          <thead>
            <tr>
              <th>과목명</th>
              <th>요일</th>
              <th>시간</th>
              <th>기능</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (  // 과목 목록을 순회하며 테이블 행 생성
              <tr key={course.course_id}> {/* 고유 key는 course_id */}
                <td>{course.course_name}</td> {/* 과목명 */}
                <td>{course.course_day_of_week}</td>  {/* 요일 */}
                <td>{course.course_start_time}~{course.course_end_time}</td>  {/* 시간 */}
                <td>
                  <button onClick={() => handleAddCourse(course.course_id)} className="add-btn">추가</button>       {/* 추가 버튼 */}
                  <button onClick={() => handleDeleteCourse(course.course_id)} className="delete-btn">삭제</button> {/* 삭제 버튼 */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="close-button" onClick={onClose}>닫기</button>  {/* 모달 닫기 버튼 */}
      </div>
    </div>
  );
}

export default ScheduleChangeModal;
