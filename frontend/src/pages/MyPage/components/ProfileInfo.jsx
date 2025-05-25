import React from 'react';

function ProfileInfo() {
  // 임시 사용자 데이터 (실제로는 API나 상태 관리를 통해 가져와야 함)
  const userData = {
    username: 'user123',
    name: '홍길동',
    email: 'user123@example.com',
    studentId: '12345678',
    department: '컴퓨터공학과',
    joinDate: '2023-03-01',
    profileImage: null
  };

  return (
    <div>
      <h2 className="mypage-panel-title">내 프로필</h2>

      <div className="profile-section">
        {/* 프로필 이미지 */}
        <div className="profile-image-section">
          <div className="profile-image">
            {userData.profileImage ? 
              <img src={userData.profileImage} alt="프로필 이미지" /> : 
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e9ecef', color: '#495057' }}>
                {userData.name.charAt(0)}
              </div>
            }
          </div>
          <div>
            <h3 style={{ margin: '0 0 5px 0', fontSize: '18px' }}>{userData.name}</h3>
            <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>{userData.department}</p>
          </div>
        </div>

        {/* 사용자 정보 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <p style={{ color: '#888', fontSize: '14px', margin: '0 0 5px 0' }}>아이디</p>
            <p style={{ fontWeight: '500', fontSize: '15px', margin: '0' }}>{userData.username}</p>
          </div>
          <div>
            <p style={{ color: '#888', fontSize: '14px', margin: '0 0 5px 0' }}>이름</p>
            <p style={{ fontWeight: '500', fontSize: '15px', margin: '0' }}>{userData.name}</p>
          </div>
          <div>
            <p style={{ color: '#888', fontSize: '14px', margin: '0 0 5px 0' }}>이메일</p>
            <p style={{ fontWeight: '500', fontSize: '15px', margin: '0' }}>{userData.email}</p>
          </div>
          <div>
            <p style={{ color: '#888', fontSize: '14px', margin: '0 0 5px 0' }}>학번</p>
            <p style={{ fontWeight: '500', fontSize: '15px', margin: '0' }}>{userData.studentId}</p>
          </div>
          <div>
            <p style={{ color: '#888', fontSize: '14px', margin: '0 0 5px 0' }}>학과</p>
            <p style={{ fontWeight: '500', fontSize: '15px', margin: '0' }}>{userData.department}</p>
          </div>
          <div>
            <p style={{ color: '#888', fontSize: '14px', margin: '0 0 5px 0' }}>가입일</p>
            <p style={{ fontWeight: '500', fontSize: '15px', margin: '0' }}>{userData.joinDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo; 