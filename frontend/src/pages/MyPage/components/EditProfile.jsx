import React, { useState } from 'react';

function EditProfile() {
  // 임시 사용자 데이터 (실제로는 API나 상태 관리를 통해 가져와야 함)
  const [userData, setUserData] = useState({
    name: '홍길동',
    email: 'user123@example.com',
    department: '컴퓨터공학과',
    studentId: '12345678',
    profileImage: null
  });

  // 폼 데이터 상태 관리
  const [formData, setFormData] = useState({ ...userData });
  
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
  const handleSubmit = (e) => {
    e.preventDefault();
    // 실제로는 API를 통해 서버에 업데이트 요청
    setUserData(formData);
    alert('프로필이 성공적으로 업데이트되었습니다.');
  };

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
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e9ecef', color: '#495057' }}>
                {formData.name.charAt(0)}
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
          />
        </div>

        {/* 학과 */}
        <div className="form-group">
          <label htmlFor="department">학과</label>
          <input
            type="text"
            id="department"
            name="department"
            className="form-control"
            value={formData.department}
            onChange={handleInputChange}
          />
        </div>

        {/* 학번 */}
        <div className="form-group">
          <label htmlFor="studentId">학번</label>
          <input
            type="text"
            id="studentId"
            name="studentId"
            className="form-control"
            value={formData.studentId}
            onChange={handleInputChange}
            readOnly
          />
          <small style={{ color: '#888', fontSize: '12px' }}>학번은 변경할 수 없습니다.</small>
        </div>

        {/* 버튼 */}
        <div style={{ marginTop: '30px' }}>
          <button type="button" className="cancel-button">취소</button>
          <button type="submit" className="submit-button">저장</button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile; 