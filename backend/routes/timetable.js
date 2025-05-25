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

// 2️⃣ 시간표에 과목 추가 (POST /api/timetable)
router.post('/', async (req, res) => {
  const { user_id, course_id, tt_year, tt_semester } = req.body;
  try {
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

// GET /api/courses - 과목 목록 가져오기
router.get('/courses', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM courses');
      res.json(rows);
    } catch (error) {
      console.error('과목 목록 조회 오류:', error);
      res.status(500).json({ error: '과목 목록 조회 오류', detail: error.message });
    }
  });

module.exports = router;
