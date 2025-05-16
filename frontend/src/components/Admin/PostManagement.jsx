import React, { useState } from 'react';

function PostManagement() {
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
  const [categoryFilter, setCategoryFilter] = useState('전체'); // 카테고리 필터 상태

  // 게시글 목록 (예시 데이터)
  const posts = [
    { id: 1, title: '시험 기간 도서관 이용 시간', category: '공지사항', author: '김학생', date: '2023-06-15', views: 342, comments: 28, status: '게시중' },
    { id: 2, title: '축제 라인업 어떻게 생각하세요?', category: '자유게시판', author: '이대학', date: '2023-06-14', views: 215, comments: 45, status: '게시중' },
    { id: 3, title: '동아리 신입 모집합니다', category: '동아리', author: '박동아리', date: '2023-06-13', views: 189, comments: 12, status: '게시중' },
    { id: 4, title: '학생회 회의록', category: '학생회', author: '정학생', date: '2023-06-12', views: 156, comments: 5, status: '게시중' },
    { id: 5, title: '과제 관련 질문', category: '학과게시판', author: '최학생', date: '2023-06-11', views: 98, comments: 7, status: '게시중' },
    { id: 6, title: '중고 책 판매합니다', category: '장터', author: '윤학생', date: '2023-06-10', views: 124, comments: 3, status: '게시중' },
    { id: 7, title: '기숙사 생활 꿀팁', category: '자유게시판', author: '한기숙', date: '2023-06-09', views: 276, comments: 19, status: '신고됨' }
  ];

  // 카테고리 목록
  const categories = ['전체', '공지사항', '자유게시판', '학과게시판', '동아리', '학생회', '장터'];

  const handleSearch = (e) => { // 검색 처리
    e.preventDefault();
    console.log('검색어:', searchTerm);
  };

  const handleStatusChange = (postId, newStatus) => { // 상태 변경 처리
    console.log(`게시글 ID ${postId}의 상태를 ${newStatus}로 변경`);
  };

  const handleDelete = (postId) => { // 삭제 처리
    if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      console.log(`게시글 ID ${postId} 삭제`);
    }
  };

  const handleCategoryChange = (e) => { // 카테고리 변경 처리
    setCategoryFilter(e.target.value);
    console.log('카테고리 필터:', e.target.value);
  };

  const filteredPosts = categoryFilter === '전체' // 선택된 카테고리에 따라 필터링
    ? posts 
    : posts.filter(post => post.category === categoryFilter);

  return (
    <div>
      <h2 className="admin-panel-title">게시글 관리</h2>
      
      <div className="search-form"> {/* 필터 및 검색 */}
        <select 
          className="form-control" 
          value={categoryFilter} 
          onChange={handleCategoryChange}
          style={{ width: 'auto', marginRight: '10px' }}
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
        
        <input
          type="text"
          className="search-input"
          placeholder="게시글 제목 또는 작성자 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="button" className="search-button" onClick={handleSearch}>검색</button>
      </div>
      
      <table className="admin-table"> {/* 게시글 목록 테이블 */}
        <thead>
          <tr>
            <th>제목</th>
            <th>카테고리</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>조회수</th>
            <th>댓글수</th>
            <th>상태</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {filteredPosts.map((post) => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>{post.category}</td>
              <td>{post.author}</td>
              <td>{post.date}</td>
              <td>{post.views}</td>
              <td>{post.comments}</td>
              <td>
                <select
                  defaultValue={post.status}
                  onChange={(e) => handleStatusChange(post.id, e.target.value)}
                  className="form-control"
                >
                  <option value="게시중">게시중</option>
                  <option value="숨김">숨김</option>
                  <option value="신고됨">신고됨</option>
                </select>
              </td>
              <td>
                <div className="table-actions">
                  <button 
                    className="action-button edit-button"
                    onClick={() => console.log(`게시글 ID ${post.id} 수정`)}
                  >
                    보기
                  </button>
                  <button 
                    className="action-button delete-button"
                    onClick={() => handleDelete(post.id)}
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

export default PostManagement; 