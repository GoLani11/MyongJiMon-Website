import React, { useState, useEffect } from 'react';
import { getUserProfile, getCurrentUser } from '../../../services/userService';

function ProfileInfo() {
  // 사용자 데이터 상태
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 컴포넌트 마운트 시 사용자 정보 로드
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        setLoading(true);
        
        // 로컬스토리지에서 현재 사용자 정보 가져오기
        const currentUser = getCurrentUser();
        if (!currentUser || !currentUser.id) {
          setError('로그인이 필요합니다.');
          setLoading(false);
          return;
        }

        // API를 통해 최신 사용자 정보 가져오기
        const result = await getUserProfile(currentUser.id);
        
        if (result.success) {
          setUserData(result.user);
          setError(null);
        } else {
          setError(result.message || '사용자 정보를 불러올 수 없습니다.');
        }
      } catch (error) {
        console.error('사용자 정보 로드 오류:', error);
        setError('사용자 정보를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, []);

  // 로딩 상태
  if (loading) {
    return (
      <div>
        <h2 className="mypage-panel-title">내 프로필</h2>
        <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
          사용자 정보를 불러오는 중...
        </div>
      </div>
    );
  }

  // 오류 상태
  if (error) {
    return (
      <div>
        <h2 className="mypage-panel-title">내 프로필</h2>
        <div style={{ textAlign: 'center', padding: '50px', color: '#ff6b6b' }}>
          {error}
        </div>
      </div>
    );
  }

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR');
  };

  return (
    <div>
      <h2 className="mypage-panel-title">내 프로필</h2>

      <div className="profile-section">
        {/* 프로필 이미지 */}
        <div className="profile-image-section">
          <div className="profile-image">
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e9ecef', color: '#495057', fontSize: '36px', fontWeight: 'bold' }}>
              {userData?.name ? userData.name.charAt(0) : '?'}
            </div>
          </div>
          <div>
            <h3 style={{ margin: '0 0 5px 0', fontSize: '18px' }}>{userData?.name || '이름 없음'}</h3>
            <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
              {userData?.type === 'STUDENT' ? '학생' : userData?.type || '미분류'}
            </p>
          </div>
        </div>

        {/* 사용자 정보 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <p style={{ color: '#888', fontSize: '14px', margin: '0 0 5px 0' }}>아이디</p>
            <p style={{ fontWeight: '500', fontSize: '15px', margin: '0' }}>{userData?.username || '-'}</p>
          </div>
          <div>
            <p style={{ color: '#888', fontSize: '14px', margin: '0 0 5px 0' }}>이름</p>
            <p style={{ fontWeight: '500', fontSize: '15px', margin: '0' }}>{userData?.name || '-'}</p>
          </div>
          <div>
            <p style={{ color: '#888', fontSize: '14px', margin: '0 0 5px 0' }}>이메일</p>
            <p style={{ fontWeight: '500', fontSize: '15px', margin: '0' }}>{userData?.email || '-'}</p>
          </div>
          <div>
            <p style={{ color: '#888', fontSize: '14px', margin: '0 0 5px 0' }}>학번</p>
            <p style={{ fontWeight: '500', fontSize: '15px', margin: '0' }}>{userData?.studentId || '-'}</p>
          </div>
          <div>
            <p style={{ color: '#888', fontSize: '14px', margin: '0 0 5px 0' }}>계정 유형</p>
            <p style={{ fontWeight: '500', fontSize: '15px', margin: '0' }}>
              {userData?.type === 'STUDENT' ? '학생' : userData?.type || '-'}
            </p>
          </div>
          <div>
            <p style={{ color: '#888', fontSize: '14px', margin: '0 0 5px 0' }}>가입일</p>
            <p style={{ fontWeight: '500', fontSize: '15px', margin: '0' }}>{formatDate(userData?.joinDate)}</p>
          </div>
        </div>

        {/* 계정 상태 표시 */}
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
            계정 상태: 
            <span style={{ 
              marginLeft: '8px', 
              padding: '4px 8px', 
              borderRadius: '12px', 
              fontSize: '12px',
              backgroundColor: userData?.status === 'ENROLLED' ? '#d4edda' : '#f8d7da',
              color: userData?.status === 'ENROLLED' ? '#155724' : '#721c24'
            }}>
              {userData?.status === 'ENROLLED' ? '활성' : userData?.status || '알 수 없음'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo; 