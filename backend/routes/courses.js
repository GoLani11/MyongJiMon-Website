// routes/courses.js
const express = require('express');   // Express 프레임워크를 불러옴
const router = express.Router();      // Express의 Router 객체를 생성
const pool = require('../db');        // 데이터베이스 연결을 위한 pool 객체를 불러옴(db.js에서 설정)

// GET /api/courses 요청을 처리하는 라우터
router.get('/', async (req, res) => {   // 루트 경로('/') 즉, /api/courses로 GET 요청이 들어오면 실행
  try {
    // 비동기적으로 데이터베이스 쿼리 실행
    // pool.query : MySQL에 SQL문을 보내는 함수
    // 반환값은 [rows, fields] 배열이며, rows에 결과 행들이 들어감
    const [rows] = await pool.query('SELECT * FROM courses');
    // 성공적으로 데이터를 가져왔으면 JSON 형식으로 rows를 응답으로 전송
    res.json(rows);
  } catch (err) {
    // 오류가 발생하면 500 상태 코드와 오류 메시지를 응답으로 전송
    // detail: err.message : 실제 오류 상세 메시지(개발용)
    res.status(500).json({ error: '과목 목록 조회 오류', detail: err.message });
  }
});

// 라우터를 모듈로 내보내기
module.exports = router;