// timetable.js

const express = require('express');
const router = express.Router();
const pool = require('../db');  // db.js 불러오기

// 1️⃣ 자신의 시간표 조회 (GET /api/timetable/:userId)
router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const [rows] = await pool.query(`
      SELECT t.*, c.course_name, c.course_day_of_week, c.course_start_time, c.course_end_time, c.course_location
      FROM timetable t
      JOIN courses c ON t.course_id = c.course_id
      WHERE t.user_id = ?
    `, [userId]);
    res.json(rows);
  } catch (err) {
    console.error('시간표 조회 오류:', err);
    res.status(500).json({ error: 'DB 오류', details: err.message });
  }
});

// POST /api/timetable
router.post('/', async (req, res) => {
  const { user_id, course_id, tt_year, tt_semester } = req.body;
  try {
    // 🟢 중복 검사
    const [existing] = await pool.query(
      'SELECT * FROM timetable WHERE user_id = ? AND course_id = ?',
      [user_id, course_id]
    );

    if (existing.length > 0) {
      // 이미 존재하는 경우
      return res.status(400).json({ error: '이미 시간표에 추가된 과목입니다' });
    }

    // 신규 추가
    await pool.query(`
      INSERT INTO timetable (user_id, course_id, tt_year, tt_semester)
      VALUES (?, ?, ?, ?)
    `, [user_id, course_id, tt_year, tt_semester]);

    res.json({ message: '시간표 추가 성공!' });
  } catch (err) {
    console.error('시간표 추가 오류:', err);
    res.status(500).json({ error: 'DB 오류', details: err.message });
  }
});

// DELETE /api/timetable/:user_id/:course_id - 특정 유저의 특정 과목 삭제
router.delete('/:user_id/:course_id', async (req, res) => {
  const { user_id, course_id } = req.params;

  try {
    const [result] = await pool.query(
      'DELETE FROM timetable WHERE user_id = ? AND course_id = ?',
      [user_id, course_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '삭제할 과목이 없음' });
    }

    res.json({ message: '삭제 완료' });
  } catch (error) {
    console.error('시간표 삭제 오류:', error);
    res.status(500).json({ error: '시간표 삭제 실패', detail: error.message });
  }
});

module.exports = router;
