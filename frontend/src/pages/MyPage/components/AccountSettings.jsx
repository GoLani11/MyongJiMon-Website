import React, { useState } from 'react';

function AccountSettings() {
  // 계정 설정 상태
  const [settings, setSettings] = useState({
    emailNotification: true,
    postNotification: true,
    commentNotification: true,
    messageNotification: false,
    profilePublic: true,
    autoLogin: true
  });

  // 설정 변경 핸들러
  const handleSettingChange = (e) => {
    const { name, checked } = e.target;
    setSettings({
      ...settings,
      [name]: checked
    });
  };

  // 설정 저장 핸들러
  const handleSaveSettings = (e) => {
    e.preventDefault();
    // 실제로는 API를 통해 서버에 설정 저장 요청
    alert('설정이 저장되었습니다.');
  };

  // 계정 탈퇴 핸들러
  const handleAccountDelete = () => {
    if (window.confirm('정말 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
  
      alert('계정이 삭제되었습니다. 이용해 주셔서 감사합니다.');
    }
  };

  return (
    <div>
      <h2 className="mypage-panel-title">계정 설정</h2>

      <form onSubmit={handleSaveSettings}>
        {/* 알림 설정 */}
        <div style={{ marginBottom: '25px' }}>
          <h3 style={{ fontSize: '17px', fontWeight: '600', color: '#333', marginBottom: '15px' }}>알림 설정</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                id="emailNotification"
                name="emailNotification"
                checked={settings.emailNotification}
                onChange={handleSettingChange}
              />
              <label htmlFor="emailNotification" style={{ marginLeft: '10px', fontSize: '14px' }}>
                이메일 알림 받기
              </label>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                id="postNotification"
                name="postNotification"
                checked={settings.postNotification}
                onChange={handleSettingChange}
              />
              <label htmlFor="postNotification" style={{ marginLeft: '10px', fontSize: '14px' }}>
                새 게시글 알림 받기
              </label>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                id="commentNotification"
                name="commentNotification"
                checked={settings.commentNotification}
                onChange={handleSettingChange}
              />
              <label htmlFor="commentNotification" style={{ marginLeft: '10px', fontSize: '14px' }}>
                댓글 알림 받기
              </label>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                id="messageNotification"
                name="messageNotification"
                checked={settings.messageNotification}
                onChange={handleSettingChange}
              />
              <label htmlFor="messageNotification" style={{ marginLeft: '10px', fontSize: '14px' }}>
                쪽지 알림 받기
              </label>
            </div>
          </div>
        </div>

        {/* 개인정보 설정 */}
        <div style={{ marginBottom: '25px' }}>
          <h3 style={{ fontSize: '17px', fontWeight: '600', color: '#333', marginBottom: '15px' }}>개인정보 설정</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                id="profilePublic"
                name="profilePublic"
                checked={settings.profilePublic}
                onChange={handleSettingChange}
              />
              <label htmlFor="profilePublic" style={{ marginLeft: '10px', fontSize: '14px' }}>
                내 프로필 공개하기
              </label>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                id="autoLogin"
                name="autoLogin"
                checked={settings.autoLogin}
                onChange={handleSettingChange}
              />
              <label htmlFor="autoLogin" style={{ marginLeft: '10px', fontSize: '14px' }}>
                자동 로그인 사용
              </label>
            </div>
          </div>
        </div>

        {/* 저장 버튼 */}
        <div style={{ marginTop: '30px' }}>
          <button type="submit" className="submit-button">설정 저장</button>
        </div>
      </form>

      {/* 계정 탈퇴 */}
      <div style={{ marginTop: '50px', borderTop: '1px solid #eee', paddingTop: '30px' }}>
        <h3 style={{ fontSize: '17px', fontWeight: '600', color: '#333', marginBottom: '15px' }}>계정 탈퇴</h3>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
          계정을 탈퇴하면 모든 데이터가 삭제되며 이 작업은 되돌릴 수 없습니다.
        </p>
        <button
          onClick={handleAccountDelete}
          style={{
            padding: '10px 15px',
            backgroundColor: '#ff6b6b',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          계정 탈퇴하기
        </button>
      </div>
    </div>
  );
}

export default AccountSettings; 