// db.js - MySQL 연결 설정

// 1. 모듈 불러오기
// 비동기 Promise 기반 사용 -> 비동기 방식을 쓰기 위해
// Promise : 비동기적으로 실행하는 작업의 결과(성공 or 실패)를 나타내는 객체
// Promise 장점 : 비동기의 결과를 객체화 시킬 수 있음, await pool.query()와 같은 방식으로 간단하게 쿼리를 쓸 수 있음
const mysql = require('mysql2/promise');  
// .env 읽기 -> process.env 객체에 환경 변수를 추가
// dotenv : .env파일에 있는 환경 변수들을 Node.js가 인식할 수 있도록 설정해줌
require('dotenv').config();               

// 2. 연결 풀 생성 (connection 여러 개 관리)
// 연결 풀 : 매번 새로 연결하지 않고, 미리 만들어 둔 연결을 재사용 하는 방식
const pool = mysql.createPool({
  host: process.env.DB_HOST,            // 호스트
  port: process.env.DB_PORT,            // 포트
  user: process.env.DB_USER,            // 사용자
  password: process.env.DB_PASSWORD,    // 비밀번호
  database: process.env.DB_DATABASE,    // DB 이름
  waitForConnections: true,             // 연결 풀 대기 허용 -> 연결이 없으면 기다렸다가 사용하도록 설정
  connectionLimit: 10,                  // 최대 연결 개수
  queueLimit: 0,                        // 대기열 제한 없음 -> 0 : 무제한

  // SSL(보안연결) 허용 -> 공인인증서가 없을 때 연결을 허용하는 설정
  ssl: {
    rejectUnauthorized: false
  }
});

// 3. pool을 다른 곳에서 사용할 수 있게 export
module.exports = pool;