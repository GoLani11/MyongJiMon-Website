import React, { useState } from 'react';
import { changePassword, getCurrentUser } from '../../../services/userService';

function ChangePassword() {
  // 비밀번호 폼 상태
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // 오류 메시지 상태
  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // 로딩 상태
  const [loading, setLoading] = useState(false);

  // 입력 필드 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
    
    // 입력 시 해당 필드의 에러 메시지 초기화
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // 폼 유효성 검사
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // 현재 비밀번호 검사
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = '현재 비밀번호를 입력해주세요.';
      isValid = false;
    }

    // 새 비밀번호 검사
    if (!passwordData.newPassword) {
      newErrors.newPassword = '새 비밀번호를 입력해주세요.';
      isValid = false;
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = '비밀번호는 8자 이상이어야 합니다.';
      isValid = false;
    } else if (passwordData.currentPassword === passwordData.newPassword) {
      newErrors.newPassword = '현재 비밀번호와 새 비밀번호가 같습니다.';
      isValid = false;
    }

    // 비밀번호 확인 검사
    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호 확인을 입력해주세요.';
      isValid = false;
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // 현재 사용자 정보 가져오기
      const currentUser = getCurrentUser();
      if (!currentUser || !currentUser.id) {
        alert('로그인이 필요합니다.');
        setLoading(false);
        return;
      }

      // API를 통해 비밀번호 변경
      const result = await changePassword(currentUser.id, {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });

      if (result.success) {
        alert('비밀번호가 성공적으로 변경되었습니다.');
        // 폼 초기화
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setErrors({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        // 서버에서 온 오류 메시지 처리
        if (result.message.includes('현재 비밀번호')) {
          setErrors({
            ...errors,
            currentPassword: result.message
          });
        } else {
          alert(result.message || '비밀번호 변경에 실패했습니다.');
        }
      }
    } catch (error) {
      console.error('비밀번호 변경 오류:', error);
      alert('비밀번호 변경 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 취소 핸들러
  const handleCancel = () => {
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setErrors({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  return (
    <div>
      <h2 className="mypage-panel-title">비밀번호 변경</h2>

      <form onSubmit={handleSubmit}>
        {/* 현재 비밀번호 */}
        <div className="form-group">
          <label htmlFor="currentPassword">현재 비밀번호</label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            className="form-control"
            value={passwordData.currentPassword}
            onChange={handleInputChange}
            disabled={loading}
          />
          {errors.currentPassword && (
            <p style={{ color: 'red', fontSize: '13px', marginTop: '5px' }}>
              {errors.currentPassword}
            </p>
          )}
        </div>

        {/* 새 비밀번호 */}
        <div className="form-group">
          <label htmlFor="newPassword">새 비밀번호</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            className="form-control"
            value={passwordData.newPassword}
            onChange={handleInputChange}
            disabled={loading}
          />
          {errors.newPassword ? (
            <p style={{ color: 'red', fontSize: '13px', marginTop: '5px' }}>
              {errors.newPassword}
            </p>
          ) : (
            <small style={{ color: '#888', fontSize: '12px' }}>
              8자 이상의 비밀번호를 입력해주세요.
            </small>
          )}
        </div>

        {/* 비밀번호 확인 */}
        <div className="form-group">
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="form-control"
            value={passwordData.confirmPassword}
            onChange={handleInputChange}
            disabled={loading}
          />
          {errors.confirmPassword && (
            <p style={{ color: 'red', fontSize: '13px', marginTop: '5px' }}>
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* 버튼 */}
        <div style={{ marginTop: '30px' }}>
          <button 
            type="button" 
            className="cancel-button" 
            onClick={handleCancel}
            disabled={loading}
          >
            취소
          </button>
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? '변경 중...' : '비밀번호 변경'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword; 