const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: '*', // 모든 프론트엔드 접근 허용 (개발용)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// 📌 라우터 연결
const timetableRouter = require('./routes/timetable');
const courseRouter = require('./routes/courses');  // ✅ courses.js 추가
const authRouter = require('./routes/auth');        // ✅ auth.js 추가

app.use('/api/timetable', timetableRouter);
app.use('/api/courses', courseRouter);  // ✅ 여기에 연결해야 /api/courses 작동함
app.use('/api/auth', authRouter);       // ✅ 인증 라우터 연결

// 기본 라우터
app.get('/', (req, res) => {
  res.send('백엔드 서버 연결 완료');
});

// ✅ DB 테스트용
const pool = require('./db');
app.get('/api/test', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT NOW() AS `current_time`');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'DB 오류 발생', detail: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
