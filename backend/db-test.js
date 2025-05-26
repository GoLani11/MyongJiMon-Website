// DB 테이블 구조 분석용 테스트 파일
const pool = require('./db');

async function analyzeDatabase() {
  try {
    console.log('=== DB 연결 테스트 ===');
    
    // 1. 연결 테스트
    const [connectionTest] = await pool.query('SELECT NOW() AS current_time');
    console.log('✅ DB 연결 성공:', connectionTest[0].current_time);
    
    // 2. 테이블 목록 조회
    console.log('\n=== 테이블 목록 ===');
    const [tables] = await pool.query('SHOW TABLES');
    console.log('테이블들:', tables);
    
    // 3. 각 테이블의 구조 확인
    for (const table of tables) {
      const tableName = Object.values(table)[0];
      console.log(`\n=== ${tableName} 테이블 구조 ===`);
      const [columns] = await pool.query(`DESCRIBE ${tableName}`);
      console.table(columns);
    }
    
  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
  } finally {
    // 연결 종료
    await pool.end();
  }
}

// 실행
analyzeDatabase();