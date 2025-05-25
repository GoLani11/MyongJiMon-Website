// ScheduleChangeModal.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ScheduleChangeModal.css';  // CSS 경로 수정

function ScheduleChangeModal({ onClose }) {
  const [courses, setCourses] = useState([]);

  // 1️⃣ 과목 목록 불러오기
  useEffect(() => {
    axios.get('/api/courses')
      .then((response) => setCourses(response.data))
      .catch((error) => console.error('과목 목록 불러오기 실패', error));
  }, []);

  // 2️⃣ 과목 추가 처리
  const handleAddCourse = (courseId) => {
    const userId = 1;  // 예시로 userId=1, 로그인 시스템과 연계 필요
    axios.post('/api/timetable', {
      user_id: userId,
      course_id: courseId,
      tt_year: 2025,
      tt_semester: '1학기'
    })
    .then(() => {
      alert('시간표에 추가 완료!');
      onClose();  // 모달 닫기
    })
    .catch((error) => {
      console.error('시간표 추가 오류:', error);
      alert('추가 중 오류 발생');
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>시간표 변경하기</h2>
        <button className="close-button" onClick={onClose}>닫기</button>
        <ul className="course-list">
          {courses.map((course) => (
            <li key={course.course_id} className="course-item">
              <div>
                {course.course_name} ({course.course_day_of_week}, {course.course_start_time}~{course.course_end_time})
              </div>
              <button onClick={() => handleAddCourse(course.course_id)}>추가</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ScheduleChangeModal;
