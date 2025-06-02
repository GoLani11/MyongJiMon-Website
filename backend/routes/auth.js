// auth.js - 인증 관련 라우터

const express = require('express');
const router = express.Router();
const pool = require('../db');

// 1. 로그인 API
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // 입력값 검증
    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        message: '아이디와 비밀번호를 입력해주세요.' 
      });
    }

    // 사용자 조회 (users 테이블)
    const [userRows] = await pool.query(
      'SELECT user_id, user_name, user_password, user_email, user_type, user_school_id, user_status FROM users WHERE user_name = ?',
      [username]
    );

    if (userRows.length > 0) {
      const user = userRows[0];
      
      // 비밀번호 확인
      if (user.user_password === password) {
        // 계정 상태 확인
        if (user.user_status !== 'ACTIVE' && user.user_status !== 'ENROLLED') {
          return res.status(403).json({
            success: false,
            message: '비활성화된 계정입니다.'
          });
        }

        return res.json({
          success: true,
          message: '로그인 성공',
          user: {
            id: user.user_id,
            username: user.user_name,
            email: user.user_email,
            type: user.user_type,
            schoolId: user.user_school_id
          }
        });
      }
    }

    // 로그인 실패
    return res.status(401).json({
      success: false,
      message: '아이디 또는 비밀번호가 일치하지 않습니다.'
    });

  } catch (error) {
    console.error('로그인 오류:', error);
    return res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다.'
    });
  }
});

// 2. 회원가입 API
router.post('/register', async (req, res) => {
  try {
    const { username, password, confirmPassword, email, studentId } = req.body;
    
    // 입력값 검증
    if (!username || !password || !confirmPassword || !email || !studentId) {
      return res.status(400).json({ 
        success: false, 
        message: '모든 필드를 입력해주세요.' 
      });
    }

    // 비밀번호 확인
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: '비밀번호가 일치하지 않습니다.'
      });
    }

    // 중복 확인 - 아이디
    const [existingUser] = await pool.query(
      'SELECT user_id FROM users WHERE user_name = ?',
      [username]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({
        success: false,
        message: '이미 존재하는 아이디입니다.'
      });
    }

    // 중복 확인 - 이메일
    const [existingEmail] = await pool.query(
      'SELECT user_id FROM users WHERE user_email = ?',
      [email]
    );

    if (existingEmail.length > 0) {
      return res.status(409).json({
        success: false,
        message: '이미 사용중인 이메일입니다.'
      });
    }

    // 중복 확인 - 학번
    const [existingStudentId] = await pool.query(
      'SELECT user_id FROM users WHERE user_school_id = ?',
      [studentId]
    );

    if (existingStudentId.length > 0) {
      return res.status(409).json({
        success: false,
        message: '이미 등록된 학번입니다.'
      });
    }

    // 사용자 등록
    const [result] = await pool.query(
      'INSERT INTO users (user_name, user_password, user_email, user_type, user_school_id, user_status, user_created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())',
      [username, password, email, 'STUDENT', studentId, 'ENROLLED']
    );

    return res.status(201).json({
      success: true,
      message: '회원가입이 완료되었습니다.',
      userId: result.insertId
    });

  } catch (error) {
    console.error('회원가입 오류:', error);
    return res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다.'
    });
  }
});

// 3. 아이디 찾기 API
router.post('/find-id', async (req, res) => {
  try {
    const { contact, studentId } = req.body;
    
    // 입력값 검증
    if (!contact || !studentId) {
      return res.status(400).json({ 
        success: false, 
        message: '이메일과 학번을 입력해주세요.' 
      });
    }

    // 사용자 조회 - 이메일과 학번으로 검색
    const [userRows] = await pool.query(
      'SELECT user_name FROM users WHERE user_email = ? AND user_school_id = ? AND user_status IN ("ACTIVE", "ENROLLED")',
      [contact, studentId]
    );

    if (userRows.length > 0) {
      const username = userRows[0].user_name;
      // 보안을 위해 일부 문자를 마스킹
      const maskedUsername = username.substring(0, 2) + '*'.repeat(username.length - 2);
      
      return res.json({
        success: true,
        message: '아이디를 찾았습니다.',
        username: maskedUsername,
        fullUsername: username // 실제 구현시에는 제거하거나 이메일로 전송
      });
    }

    return res.status(404).json({
      success: false,
      message: '일치하는 정보를 찾을 수 없습니다.'
    });

  } catch (error) {
    console.error('아이디 찾기 오류:', error);
    return res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다.'
    });
  }
});

// 4. 아이디 중복 확인 API
router.get('/check-username/:username', async (req, res) => {
  try {
    const { username } = req.params;
    
    const [existingUser] = await pool.query(
      'SELECT user_id FROM users WHERE user_name = ?',
      [username]
    );

    return res.json({
      success: true,
      available: existingUser.length === 0
    });

  } catch (error) {
    console.error('아이디 중복 확인 오류:', error);
    return res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다.'
    });
  }
});

// 5. 비밀번호 찾기 API
router.post('/find-password', async (req, res) => {
  try {
    const { username, contact, studentId } = req.body;
    
    // 입력값 검증
    if (!username || !contact || !studentId) {
      return res.status(400).json({ 
        success: false, 
        message: '아이디, 이메일, 학번을 모두 입력해주세요.' 
      });
    }

    // 사용자 조회 - 아이디, 이메일, 학번으로 검색
    const [userRows] = await pool.query(
      'SELECT user_id, user_password FROM users WHERE user_name = ? AND user_email = ? AND user_school_id = ? AND user_status IN ("ACTIVE", "ENROLLED")',
      [username, contact, studentId]
    );

    if (userRows.length > 0) {
      const password = userRows[0].user_password;
      // 보안을 위해 일부 문자를 마스킹
      const maskedPassword = password.substring(0, 2) + '*'.repeat(password.length - 2);
      
      return res.json({
        success: true,
        message: '비밀번호를 찾았습니다.',
        password: maskedPassword,
        fullPassword: password // 실제 구현시에는 제거하거나 이메일로 전송
      });
    }

    return res.status(404).json({
      success: false,
      message: '일치하는 정보를 찾을 수 없습니다.'
    });

  } catch (error) {
    console.error('비밀번호 찾기 오류:', error);
    return res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다.'
    });
  }
});

// 6. 사용자 정보 조회 API
router.get('/profile/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const [userRows] = await pool.query(
      'SELECT user_id, user_name, user_email, user_school_id, user_type, user_created_at, user_status FROM users WHERE user_id = ? AND user_status IN ("ACTIVE", "ENROLLED")',
      [userId]
    );

    if (userRows.length > 0) {
      const user = userRows[0];
      return res.json({
        success: true,
        user: {
          id: user.user_id,
          username: user.user_name,
          name: user.user_name,
          email: user.user_email,
          studentId: user.user_school_id,
          type: user.user_type,
          joinDate: user.user_created_at,
          status: user.user_status
        }
      });
    }

    return res.status(404).json({
      success: false,
      message: '사용자를 찾을 수 없습니다.'
    });

  } catch (error) {
    console.error('사용자 정보 조회 오류:', error);
    return res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다.'
    });
  }
});

// 7. 프로필 수정 API
router.put('/profile/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email } = req.body;
    
    // 입력값 검증
    if (!name || !email) {
      return res.status(400).json({ 
        success: false, 
        message: '이름과 이메일을 입력해주세요.' 
      });
    }

    // 이메일 중복 확인 (자신 제외)
    const [existingEmail] = await pool.query(
      'SELECT user_id FROM users WHERE user_email = ? AND user_id != ?',
      [email, userId]
    );

    if (existingEmail.length > 0) {
      return res.status(409).json({
        success: false,
        message: '이미 사용중인 이메일입니다.'
      });
    }

    // 프로필 업데이트 (user_real_name 대신 user_name 업데이트)
    const [result] = await pool.query(
      'UPDATE users SET user_name = ?, user_email = ? WHERE user_id = ?',
      [name, email, userId]
    );

    if (result.affectedRows > 0) {
      return res.json({
        success: true,
        message: '프로필이 성공적으로 업데이트되었습니다.'
      });
    }

    return res.status(404).json({
      success: false,
      message: '사용자를 찾을 수 없습니다.'
    });

  } catch (error) {
    console.error('프로필 수정 오류:', error);
    return res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다.'
    });
  }
});

// 8. 비밀번호 변경 API
router.put('/change-password/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { currentPassword, newPassword } = req.body;
    
    // 입력값 검증
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ 
        success: false, 
        message: '현재 비밀번호와 새 비밀번호를 입력해주세요.' 
      });
    }

    // 현재 비밀번호 확인
    const [userRows] = await pool.query(
      'SELECT user_password FROM users WHERE user_id = ?',
      [userId]
    );

    if (userRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: '사용자를 찾을 수 없습니다.'
      });
    }

    if (userRows[0].user_password !== currentPassword) {
      return res.status(400).json({
        success: false,
        message: '현재 비밀번호가 올바르지 않습니다.'
      });
    }

    // 비밀번호 업데이트
    const [result] = await pool.query(
      'UPDATE users SET user_password = ? WHERE user_id = ?',
      [newPassword, userId]
    );

    if (result.affectedRows > 0) {
      return res.json({
        success: true,
        message: '비밀번호가 성공적으로 변경되었습니다.'
      });
    }

    return res.status(500).json({
      success: false,
      message: '비밀번호 변경에 실패했습니다.'
    });

  } catch (error) {
    console.error('비밀번호 변경 오류:', error);
    return res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다.'
    });
  }
});

module.exports = router;