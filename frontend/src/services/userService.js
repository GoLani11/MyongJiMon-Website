// userService.js - 사용자 정보 관련 API 통신 서비스

// API 기본 URL
const API_BASE_URL = 'http://localhost:5000/api/auth';
// const API_BASE_URL = 'http://192.168.128.52:5000/api/auth';
// const API_BASE_URL = 'http://mjimon.duckdns.org:5000/api/auth';

// 1. 사용자 정보 조회 API 호출
export const getUserProfile = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/profile/${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('사용자 정보 조회 API 오류:', error);
    return {
      success: false,
      message: '네트워크 오류가 발생했습니다.'
    };
  }
};

// 2. 프로필 수정 API 호출
export const updateUserProfile = async (userId, profileData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/profile/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: profileData.name,
        email: profileData.email
      })
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('프로필 수정 API 오류:', error);
    return {
      success: false,
      message: '네트워크 오류가 발생했습니다.'
    };
  }
};

// 3. 비밀번호 변경 API 호출
export const changePassword = async (userId, passwordData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/change-password/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      })
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('비밀번호 변경 API 오류:', error);
    return {
      success: false,
      message: '네트워크 오류가 발생했습니다.'
    };
  }
};

// 4. 로컬스토리지에서 현재 사용자 정보 가져오기
export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('사용자 정보 가져오기 오류:', error);
    return null;
  }
};

// 5. 로컬스토리지에 사용자 정보 저장
export const setCurrentUser = (user) => {
  try {
    localStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.error('사용자 정보 저장 오류:', error);
  }
}; 