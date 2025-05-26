import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile, getCurrentUser, setCurrentUser } from '../../../services/userService';

function EditProfile() {
  // 사용자 데이터 상태
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    studentId: '',
    profileImage: null
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
          setFormData({
            name: result.user.name || '',
            email: result.user.email || '',
            studentId: result.user.studentId || '',
            profileImage: null
          });
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
  
  // 파일 선택 핸들러
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        setFormData({
          ...formData,
          profileImage: event.target.result
        });
      };
      
      reader.readAsDataURL(selectedFile);
    }
  };

  // 입력 필드 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const currentUser = getCurrentUser();
      if (!currentUser || !currentUser.id) {
        alert('로그인이 필요합니다.');
        setSaving(false);
        return;
      }

      // API를 통해 프로필 업데이트
      const result = await updateUserProfile(currentUser.id, {
        name: formData.name,
        email: formData.email
      });

      if (result.success) {
        // 로컬스토리지의 사용자 정보 업데이트
        const updatedUser = {
          ...currentUser,
          name: formData.name,
          email: formData.email
        };
        setCurrentUser(updatedUser);
        
        setUserData(prev => ({
          ...prev,
          name: formData.name,
          email: formData.email
        }));
        
        alert('프로필이 성공적으로 업데이트되었습니다.');
      } else {
        alert(result.message || '프로필 업데이트에 실패했습니다.');
      }
    } catch (error) {
      console.error('프로필 업데이트 오류:', error);
      alert('프로필 업데이트 중 오류가 발생했습니다.');
    } finally {
      setSaving(false);
    }
  };

  // 로딩 상태
  if (loading) {
    return (
      <div>
        <h2 className="mypage-panel-title">프로필 수정</h2>
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
        <h2 className="mypage-panel-title">프로필 수정</h2>
        <div style={{ textAlign: 'center', padding: '50px', color: '#ff6b6b' }}>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mypage-panel-title">프로필 수정</h2>

      <form onSubmit={handleSubmit}>
        {/* 프로필 이미지 업로드 */}
        <div className="profile-image-section">
          <div className="profile-image">
            {formData.profileImage ? (
              <img src={formData.profileImage} alt="프로필 이미지" />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e9ecef', color: '#495057', fontSize: '36px', fontWeight: 'bold' }}>
                {formData.name ? formData.name.charAt(0) : '?'}
              </div>
            )}
          </div>
          <input
            type="file"
            id="profile-image"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <label htmlFor="profile-image" className="image-upload-button">
            이미지 변경
          </label>
        </div>

        {/* 이름 */}
        <div className="form-group">
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* 이메일 */}
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* 아이디 (읽기 전용) */}
        <div className="form-group">
          <label htmlFor="username">아이디</label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            value={userData?.username || ''}
            readOnly
          />
          <small style={{ color: '#888', fontSize: '12px' }}>아이디는 변경할 수 없습니다.</small>
        </div>

        {/* 학번 (읽기 전용) */}
        <div className="form-group">
          <label htmlFor="studentId">학번</label>
          <input
            type="text"
            id="studentId"
            name="studentId"
            className="form-control"
            value={formData.studentId}
            readOnly
          />
          <small style={{ color: '#888', fontSize: '12px' }}>학번은 변경할 수 없습니다.</small>
        </div>

        {/* 버튼 */}
        <div style={{ marginTop: '30px' }}>
          <button 
            type="button" 
            className="cancel-button"
            onClick={() => {
              setFormData({
                name: userData?.name || '',
                email: userData?.email || '',
                studentId: userData?.studentId || '',
                profileImage: null
              });
            }}
          >
            취소
          </button>
          <button type="submit" className="submit-button" disabled={saving}>
            {saving ? '저장 중...' : '저장'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile; 