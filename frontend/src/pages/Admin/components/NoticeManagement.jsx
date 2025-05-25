import React, { useState } from 'react';

function NoticeManagement() {
  // 상태들
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentNotice, setCurrentNotice] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // 폼 입력 상태
  const [formValues, setFormValues] = useState({
    title: '',
    content: '',
    isImportant: false,
    isFixed: false
  });

  // 공지사항 목록 (예시 데이터)
  const notices = [
    { id: 1, title: '2023학년도 2학기 수강신청 안내', author: '교무처', date: '2023-06-15', isImportant: true, isFixed: true, views: 524 },
    { id: 2, title: '도서관 이용시간 변경 안내', author: '도서관', date: '2023-06-14', isImportant: false, isFixed: true, views: 312 },
    { id: 3, title: '학생회 선거 일정 안내', author: '학생회', date: '2023-06-13', isImportant: true, isFixed: false, views: 231 },
    { id: 4, title: '교내 축제 행사 안내', author: '학생회', date: '2023-06-12', isImportant: false, isFixed: false, views: 428 },
    { id: 5, title: '취업 박람회 개최 안내', author: '취업지원센터', date: '2023-06-11', isImportant: false, isFixed: false, views: 187 }
  ];

  const handleSearch = (e) => { // 검색 처리
    e.preventDefault();
    console.log('검색어:', searchTerm);
  };

  const handleInputChange = (e) => { // 폼 입력 변경 처리
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => { // 폼 제출 처리 (작성/수정)
    e.preventDefault();
    
    if (editMode) {
      console.log('공지사항 수정:', { id: currentNotice.id, ...formValues });
    } else {
      console.log('새 공지사항 작성:', formValues);
    }
    
    resetForm(); // 폼 초기화 및 닫기
  };

  const handleEdit = (notice) => { // 수정 모드 시작
    setEditMode(true);
    setCurrentNotice(notice);
    setFormValues({
      title: notice.title,
      content: '공지사항 내용입니다.', // 실제 내용 로드 필요
      isImportant: notice.isImportant,
      isFixed: notice.isFixed
    });
    setShowForm(true);
  };

  const handleDelete = (noticeId) => { // 삭제 처리
    if (window.confirm('정말로 이 공지사항을 삭제하시겠습니까?')) {
      console.log(`공지사항 ID ${noticeId} 삭제`);
    }
  };

  const resetForm = () => { // 폼 초기화
    setFormValues({
      title: '',
      content: '',
      isImportant: false,
      isFixed: false
    });
    setEditMode(false);
    setCurrentNotice(null);
    setShowForm(false);
  };

  return (
    <div>
      <h2 className="admin-panel-title">공지사항 관리</h2>
      
      <div className="search-form"> {/* 검색 및 작성 버튼 */}
        <input
          type="text"
          className="search-input"
          placeholder="공지사항 제목 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="button" className="search-button" onClick={handleSearch}>검색</button>
        <button 
          type="button" 
          className="submit-button" 
          style={{ marginLeft: 'auto' }}
          onClick={() => setShowForm(true)}
        >
          공지사항 작성
        </button>
      </div>
      
      {showForm && ( // 공지사항 작성/수정 폼
        <div className="admin-form" style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
          <h3>{editMode ? '공지사항 수정' : '새 공지사항 작성'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">제목</label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-control"
                value={formValues.title}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="content">내용</label>
              <textarea
                id="content"
                name="content"
                className="form-control"
                value={formValues.content}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group" style={{ display: 'flex', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  id="isImportant"
                  name="isImportant"
                  checked={formValues.isImportant}
                  onChange={handleInputChange}
                  style={{ marginRight: '8px' }}
                />
                <label htmlFor="isImportant">중요 공지</label>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  id="isFixed"
                  name="isFixed"
                  checked={formValues.isFixed}
                  onChange={handleInputChange}
                  style={{ marginRight: '8px' }}
                />
                <label htmlFor="isFixed">상단 고정</label>
              </div>
            </div>
            
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
              <button type="button" className="cancel-button" onClick={resetForm}>취소</button>
              <button type="submit" className="submit-button">{editMode ? '수정하기' : '작성하기'}</button>
            </div>
          </form>
        </div>
      )}
      
      <table className="admin-table"> {/* 공지사항 목록 테이블 */}
        <thead>
          <tr>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>조회수</th>
            <th>중요</th>
            <th>고정</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {notices.map((notice) => (
            <tr key={notice.id}>
              <td>{notice.title}</td>
              <td>{notice.author}</td>
              <td>{notice.date}</td>
              <td>{notice.views}</td>
              <td>{notice.isImportant ? '예' : '아니오'}</td>
              <td>{notice.isFixed ? '예' : '아니오'}</td>
              <td>
                <div className="table-actions">
                  <button 
                    className="action-button edit-button"
                    onClick={() => handleEdit(notice)}
                  >
                    수정
                  </button>
                  <button 
                    className="action-button delete-button"
                    onClick={() => handleDelete(notice.id)}
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

export default NoticeManagement; 