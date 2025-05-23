const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('백엔드 서버 연결 완료');
});

// ✅ 여기부터 DB 테스트용 라우터 추가
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
