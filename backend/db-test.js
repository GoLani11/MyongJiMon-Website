// DB 테스트 및 관리자 계정 생성 스크립트
require('dotenv').config();
const mysql = require('mysql2/promise');

// MySQL 연결 설정 (SSL 옵션 추가)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    // Azure MySQL은 SSL 연결 필요
    rejectUnauthorized: true
  }
});

// 테이블 구조 확인 함수
async function checkTableStructure() {
  try {
    console.log('users 테이블 구조 확인 중...');
    const [columns] = await pool.query('DESCRIBE users');
    console.log('users 테이블 컬럼:');
    columns.forEach(col => {
      console.log(`- ${col.Field} (${col.Type})`);
    });
    return columns.map(col => col.Field);
  } catch (error) {
    console.error('테이블 구조 확인 오류:', error.message);
    return [];
  }
}

// 관리자 계정 생성 함수
async function createAdminUser() {
  try {
    console.log('DB 연결 테스트 중...');
    
    // DB 연결 테스트
    const [timeResult] = await pool.query('SELECT NOW() AS now');
    console.log('현재 DB 시간:', timeResult[0].now);
    
    // 테이블 구조 확인
    const columns = await checkTableStructure();
    
    // 이미 admin 계정이 있는지 확인
    const [existingAdmin] = await pool.query('SELECT user_id FROM users WHERE user_name = ?', ['admin']);
    
    if (existingAdmin.length > 0) {
      console.log('admin 계정이 이미 존재합니다. (user_id:', existingAdmin[0].user_id, ')');
      return;
    }
    
    // 관리자 계정 생성 (테이블 구조에 따라 동적으로 쿼리 생성)
    const adminUser = {
      user_name: 'admin',
      user_password: 'admin123',
      user_email: 'admin@example.com',
      user_type: 'ADMIN',
      user_school_id: 'A12345',
      user_status: 'ACTIVE',
      user_created_at: new Date()
    };
    
    // 실제 테이블에 name 컬럼이 있는지 확인하고 추가
    if (columns.includes('user_real_name')) {
      adminUser.user_real_name = '관리자';
    } else if (columns.includes('name')) {
      adminUser.name = '관리자';
    }
    
    // 동적으로 쿼리 생성
    const fields = Object.keys(adminUser);
    const placeholders = fields.map(() => '?').join(', ');
    const values = Object.values(adminUser);
    
    const query = `INSERT INTO users (${fields.join(', ')}) VALUES (${placeholders})`;
    console.log('실행할 쿼리:', query);
    
    const [result] = await pool.query(query, values);
    
    console.log('관리자 계정이 성공적으로 생성되었습니다.');
    console.log('- 아이디:', adminUser.user_name);
    console.log('- 비밀번호:', adminUser.user_password);
    console.log('- 이메일:', adminUser.user_email);
    console.log('- 학번:', adminUser.user_school_id);
    console.log('- 유형:', adminUser.user_type);
    console.log('- 상태:', adminUser.user_status);
    
  } catch (error) {
    console.error('오류 발생:', error.message);
  } finally {
    // 연결 종료
    pool.end();
    console.log('DB 연결 종료');
  }
}

// 스크립트 실행
createAdminUser();