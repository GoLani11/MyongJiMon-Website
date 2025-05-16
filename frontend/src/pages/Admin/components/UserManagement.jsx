import React, { useState } from 'react';

function UserManagement() {
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태

  // 사용자 목록 (예시 데이터)
  const users = [
    { id: 1, username: 'student123', name: '김학생', email: 'student123@example.com', role: '학생', status: '활성', joinDate: '2023-02-15' },
    { id: 2, username: 'professor456', name: '이교수', email: 'professor456@example.com', role: '교수', status: '활성', joinDate: '2023-01-10' },
    { id: 3, username: 'admin789', name: '박관리', email: 'admin789@example.com', role: '관리자', status: '활성', joinDate: '2022-12-05' },
    { id: 4, username: 'student456', name: '최학생', email: 'student456@example.com', role: '학생', status: '비활성', joinDate: '2023-03-20' },
    { id: 5, username: 'student789', name: '정학생', email: 'student789@example.com', role: '학생', status: '활성', joinDate: '2023-04-12' },
    { id: 6, username: 'student101', name: '윤학생', email: 'student101@example.com', role: '학생', status: '활성', joinDate: '2023-05-18' },
    { id: 7, username: 'professor789', name: '한교수', email: 'professor789@example.com', role: '교수', status: '활성', joinDate: '2023-01-22' }
  ];

  const handleSearch = (e) => { // 검색 처리
    e.preventDefault();
    console.log('검색어:', searchTerm);
  };

  const handleStatusChange = (userId, newStatus) => { // 상태 변경 처리
    console.log(`사용자 ID ${userId}의 상태를 ${newStatus}로 변경`);
  };

  const handleRoleChange = (userId, newRole) => { // 권한 변경 처리
    console.log(`사용자 ID ${userId}의 권한을 ${newRole}로 변경`);
  };

  const handleDelete = (userId) => { // 삭제 처리
    if (window.confirm('정말로 이 사용자를 삭제하시겠습니까?')) {
      console.log(`사용자 ID ${userId} 삭제`);
    }
  };

  return (
    <div>
      <h2 className="admin-panel-title">사용자 관리</h2>
      
      <form className="search-form" onSubmit={handleSearch}> {/* 검색 폼 */}
        <input
          type="text"
          className="search-input"
          placeholder="이름, 아이디 또는 이메일로 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="search-button">검색</button>
      </form>
      
      <table className="admin-table"> {/* 사용자 목록 테이블 */}
        <thead>
          <tr>
            <th>아이디</th>
            <th>이름</th>
            <th>이메일</th>
            <th>권한</th>
            <th>상태</th>
            <th>가입일</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <select
                  defaultValue={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  className="form-control"
                >
                  <option value="학생">학생</option>
                  <option value="교수">교수</option>
                  <option value="관리자">관리자</option>
                </select>
              </td>
              <td>
                <select
                  defaultValue={user.status}
                  onChange={(e) => handleStatusChange(user.id, e.target.value)}
                  className="form-control"
                >
                  <option value="활성">활성</option>
                  <option value="비활성">비활성</option>
                  <option value="정지">정지</option>
                </select>
              </td>
              <td>{user.joinDate}</td>
              <td>
                <div className="table-actions">
                  <button 
                    className="action-button delete-button"
                    onClick={() => handleDelete(user.id)}
                  >
                    삭제
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="pagination"> {/* 페이지네이션 */}
        <button className="pagination-button">이전</button>
        <button className="pagination-button active">1</button>
        <button className="pagination-button">2</button>
        <button className="pagination-button">3</button>
        <button className="pagination-button">다음</button>
      </div>
    </div>
  );
}

export default UserManagement; 