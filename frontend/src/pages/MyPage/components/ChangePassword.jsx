import React, { useState } from 'react';

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
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // 실제로는 API를 통해 서버에 비밀번호 변경 요청
      alert('비밀번호가 성공적으로 변경되었습니다.');
      // 폼 초기화
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
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
          />
          {errors.confirmPassword && (
            <p style={{ color: 'red', fontSize: '13px', marginTop: '5px' }}>
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* 버튼 */}
        <div style={{ marginTop: '30px' }}>
          <button type="button" className="cancel-button">취소</button>
          <button type="submit" className="submit-button">비밀번호 변경</button>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword; 