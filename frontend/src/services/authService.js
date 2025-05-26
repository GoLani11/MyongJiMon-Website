// authService.js - 인증 관련 API 통신 서비스

// API 기본 URL (환경에 따라 수정 가능)
const API_BASE_URL = 'http://localhost:5000/api/auth';

// 1. 로그인 API 호출
export const loginUser = async (loginData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: loginData.username,
        password: loginData.password
      })
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('로그인 API 오류:', error);
    return {
      success: false,
      message: '네트워크 오류가 발생했습니다.'
    };
  }
};// 2. 회원가입 API 호출
export const registerUser = async (registerData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: registerData.username,
        password: registerData.password,
        confirmPassword: registerData.confirmPassword,
        name: registerData.name,
        email: registerData.email,
        studentId: registerData.studentId
      })
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('회원가입 API 오류:', error);
    return {
      success: false,
      message: '네트워크 오류가 발생했습니다.'
    };
  }
};

// 3. 아이디 찾기 API 호출
export const findUserId = async (findData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/find-id`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contact: findData.contact,
        studentId: findData.studentId
      })
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('아이디 찾기 API 오류:', error);
    return {
      success: false,
      message: '네트워크 오류가 발생했습니다.'
    };
  }
};

// 4. 아이디 중복 확인 API 호출
export const checkUsername = async (username) => {
  try {
    const response = await fetch(`${API_BASE_URL}/check-username/${username}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('아이디 중복 확인 API 오류:', error);
    return {
      success: false,
      message: '네트워크 오류가 발생했습니다.'
    };
  }
};

// 5. 비밀번호 찾기 API 호출
export const findPassword = async (findData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/find-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: findData.username,
        contact: findData.contact,
        studentId: findData.studentId
      })
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('비밀번호 찾기 API 오류:', error);
    return {
      success: false,
      message: '네트워크 오류가 발생했습니다.'
    };
  }
};