import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/ScheduleChangeModal.css';

function ScheduleChangeModal({ onClose, onUpdate }) {
  const [courses, setCourses] = useState([]);

  // 컴포넌트 마운트 시 과목 목록 불러오기
  useEffect(() => {
    axios.get('/api/courses')
      .then((response) => setCourses(response.data))
      .catch((error) => console.error('과목 목록 불러오기 실패', error));
  }, []);

  // 과목 추가
  const handleAddCourse = (courseId) => {
    const userId = 1;  // 임시 사용자 ID, 추후 수정 필요
    const currentYear = new Date().getFullYear();
    const currentSemester = (new Date().getMonth() + 1) <= 6 ? '1학기' : '2학기';

    axios.post('/api/timetable', {
      user_id: userId,
      course_id: courseId,
      tt_year: currentYear,
      tt_semester: currentSemester
    })
      .then(() => {
        toast.success('시간표에 추가 완료!');
        if (onUpdate) onUpdate();  // 부모 컴포넌트의 갱신 함수 호출
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          toast.warn('이미 시간표에 있습니다!');
        } else {
          toast.error('추가 중 오류 발생!');
        }
      });
  };

  // 과목 삭제
  const handleDeleteCourse = (courseId) => {
    const userId = 1;  // 임시 사용자 ID, 추후 수정 필요
    axios.delete(`/api/timetable/${userId}/${courseId}`)
      .then(() => {
        toast.success('시간표에서 삭제 완료!');
        if (onUpdate) onUpdate();  // 부모 컴포넌트의 갱신 함수 호출
      })
      .catch(() => toast.error('삭제 실패'));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>시간표 변경하기</h2>
        <table className="course-table">
          <thead>
            <tr>
              <th>과목명</th>
              <th>요일</th>
              <th>시간</th>
              <th>기능</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.course_id}>
                <td>{course.course_name}</td>
                <td>{course.course_day_of_week}</td>
                <td>{course.course_start_time}~{course.course_end_time}</td>
                <td>
                  <button onClick={() => handleAddCourse(course.course_id)} className="add-btn">추가</button>
                  <button onClick={() => handleDeleteCourse(course.course_id)} className="delete-btn">삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="close-button" onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}

export default ScheduleChangeModal;
