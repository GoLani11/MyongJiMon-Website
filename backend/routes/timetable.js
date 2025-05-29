// timetable.js

// Express 라우터 생성
const express = require('express');
const router = express.Router();
// MySQL 연결 풀 가져오기 (db.js)
const pool = require('../db');

// 1️⃣ 자신의 시간표 조회 (GET /api/timetable/:userId)
router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;   // URL에서 userId 추출
  const currentYear = new Date().getFullYear();   // 현재 연도 계산
  const currentSemester = (new Date().getMonth() + 1) <= 6 ? '1학기' : '2학기';  // 현재 학기 계산(1~6월 : 1학기, 7~12월 : 2학기)

  try {
    // 시간표 + 과목 정보 조인하여 가져오기
    const [rows] = await pool.query(`
      SELECT t.*, c.course_name, c.course_day_of_week, c.course_start_time, c.course_end_time, c.course_location
      FROM timetable t
      JOIN courses c ON t.course_id = c.course_id
      WHERE t.user_id = ? AND t.tt_year = ? AND t.tt_semester = ?
    `, [userId, currentYear, currentSemester]);

    res.json(rows); // 조회 결과 반환
  } catch (err) {
    console.error('시간표 조회 오류:', err);
    res.status(500).json({ error: 'DB 오류', details: err.message }); // 에러 처리
  }
});

// 2️⃣ 시간표에 과목 추가(POST /api/timetable)
router.post('/', async (req, res) => {
  // 요청 body에서 파라미터 추출
  const { user_id, course_id, tt_year, tt_semester } = req.body;
  try {
    // 중복 검사: 동일 과목 + 연도 + 학기 존재 여부
    const [existing] = await pool.query(
      'SELECT * FROM timetable WHERE user_id = ? AND course_id = ? AND tt_year = ? AND tt_semester = ?',
      [user_id, course_id, tt_year, tt_semester]
    );

    if (existing.length > 0) {
      return res.status(400).json({ error: '이미 시간표에 추가된 과목입니다' });  // 중복 과목 방지
    }

    // 시간대 겹침 검사 : 같은 요일 + 시간대 겹침 여부 확인
    const [courseInfo] = await pool.query(
      'SELECT course_day_of_week, course_start_time, course_end_time FROM courses WHERE course_id = ?',
      [course_id]
    );

    if (courseInfo.length === 0) {
      return res.status(404).json({ error: '해당 과목 정보를 찾을 수 없습니다' });  // 과목 정보 없음
    }

    const { course_day_of_week, course_start_time, course_end_time } = courseInfo[0];

    const [conflicts] = await pool.query(
      `SELECT t.*
       FROM timetable t
       JOIN courses c ON t.course_id = c.course_id
       WHERE t.user_id = ? AND t.tt_year = ? AND t.tt_semester = ?
         AND c.course_day_of_week = ?
         AND NOT (c.course_end_time <= ? OR c.course_start_time >= ?)`,
      [user_id, tt_year, tt_semester, course_day_of_week, course_start_time, course_end_time]
    );

    if (conflicts.length > 0) {
      return res.status(400).json({ error: '동일 요일, 시간대에 이미 다른 과목이 존재합니다' });
    }

    // 추가 : timetable에 새로운 과목 삽입입
    await pool.query(
      `INSERT INTO timetable (user_id, course_id, tt_year, tt_semester)
       VALUES (?, ?, ?, ?)`,
      [user_id, course_id, tt_year, tt_semester]
    );

    res.json({ message: '시간표 추가 성공!' }); // 성공 응답답
  } catch (err) {
    console.error('시간표 추가 오류:', err);
    res.status(500).json({ error: 'DB 오류', details: err.message }); // DB 오류
  }
});

// 3️⃣ 시간표에서 특정 과목 삭제(DELETE /api/timetable/:user_id/:course_id)
router.delete('/:user_id/:course_id', async (req, res) => {
  // URL 파라미터에서 user_id, course_id 추출
  const { user_id, course_id } = req.params;

  try {
    const [result] = await pool.query(
      'DELETE FROM timetable WHERE user_id = ? AND course_id = ?',
      [user_id, course_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '삭제할 과목이 없음' }); // 삭제할 데이터가 없을 때
    }

    res.json({ message: '삭제 완료' }); // 삭제 성공 응답
  } catch (error) {
    console.error('시간표 삭제 오류:', error);
    res.status(500).json({ error: '시간표 삭제 실패', detail: error.message }); // DB 오류 응답
  }
});

module.exports = router;
