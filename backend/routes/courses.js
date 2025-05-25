// routes/courses.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/courses
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM courses');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: '과목 목록 조회 오류', detail: err.message });
  }
});

module.exports = router;