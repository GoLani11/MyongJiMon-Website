import React, { useState } from 'react';

function ReportManagement() {
  const [reportType, setReportType] = useState('전체'); // 신고 타입 필터
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태

  // 신고 목록 (예시 데이터)
  const reports = [
    { id: 1, type: '게시글', content: '부적절한 광고 내용이 포함되어 있습니다.', reporter: '김신고자', target: '광고글 제목', targetAuthor: '홍길동', date: '2023-06-15', status: '처리중' },
    { id: 2, type: '댓글', content: '욕설이 포함되어 있습니다.', reporter: '이신고자', target: '댓글 내용...', targetAuthor: '홍길동', date: '2023-06-14', status: '처리중' },
    { id: 3, type: '게시글', content: '개인정보가 포함되어 있습니다.', reporter: '박신고자', target: '개인정보 포함 글 제목', targetAuthor: '홍길동', date: '2023-06-13', status: '처리완료' },
    { id: 4, type: '댓글', content: '다른 학생을 비방하는 내용이 있습니다.', reporter: '최신고자', target: '댓글 내용...', targetAuthor: '홍길동', date: '2023-06-12', status: '처리중' },
    { id: 5, type: '게시글', content: '저작권 침해 콘텐츠가 포함되어 있습니다.', reporter: '정신고자', target: '저작권 침해 글 제목', targetAuthor: '홍길동', date: '2023-06-11', status: '처리완료' }
  ];

  // 신고 타입 목록
  const reportTypes = ['전체', '게시글', '댓글'];

  // 신고 상태 옵션
  const reportStatuses = ['처리중', '처리완료', '거부'];

  const handleSearch = (e) => { // 검색 처리
    e.preventDefault();
    console.log('검색어:', searchTerm);
  };

  const handleTypeChange = (e) => { // 타입 필터 변경 처리
    setReportType(e.target.value);
    console.log('신고 타입 필터:', e.target.value);
  };

  const handleStatusChange = (reportId, newStatus) => { // 상태 변경 처리
    console.log(`신고 ID ${reportId}의 상태를 ${newStatus}로 변경`);
  };

  const handleViewDetail = (reportId) => { // 상세보기 처리
    console.log(`신고 ID ${reportId} 상세보기`);
  };

  const handleAction = (reportId, action) => { // 신고 처리 (삭제 등)
    if (window.confirm(`정말로 이 콘텐츠를 ${action === 'delete' ? '삭제' : '복원'}하시겠습니까?`)) {
      console.log(`신고 ID ${reportId} ${action === 'delete' ? '삭제' : '복원'}`);
    }
  };

  const filteredReports = reportType === '전체' // 타입에 따라 신고 목록 필터링
    ? reports 
    : reports.filter(report => report.type === reportType);

  return (
    <div>
      <h2 className="admin-panel-title">신고 관리</h2>
      
      <div className="search-form"> {/* 필터 및 검색 */}
        <select 
          className="form-control" 
          value={reportType} 
          onChange={handleTypeChange}
          style={{ width: 'auto', marginRight: '10px' }}
        >
          {reportTypes.map((type, index) => (
            <option key={index} value={type}>{type}</option>
          ))}
        </select>
        
        <input
          type="text"
          className="search-input"
          placeholder="신고 내용 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="button" className="search-button" onClick={handleSearch}>검색</button>
      </div>
      
      <table className="admin-table"> {/* 신고 목록 테이블 */}
        <thead>
          <tr>
            <th>유형</th>
            <th>신고 내용</th>
            <th>신고자</th>
            <th>대상</th>
            <th>작성자</th>
            <th>신고일</th>
            <th>상태</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.map((report) => (
            <tr key={report.id}>
              <td>{report.type}</td>
              <td>{report.content}</td>
              <td>{report.reporter}</td>
              <td>{report.target}</td>
              <td>{report.targetAuthor}</td>
              <td>{report.date}</td>
              <td>
                <select
                  defaultValue={report.status}
                  onChange={(e) => handleStatusChange(report.id, e.target.value)}
                  className="form-control"
                >
                  {reportStatuses.map((status, index) => (
                    <option key={index} value={status}>{status}</option>
                  ))}
                </select>
              </td>
              <td>
                <div className="table-actions">
                  <button 
                    className="action-button edit-button"
                    onClick={() => handleViewDetail(report.id)}
                  >
                    보기
                  </button>
                  <button 
                    className="action-button delete-button"
                    onClick={() => handleAction(report.id, 'delete')}
                  >
                    삭제
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="admin-stats" style={{ marginTop: '30px' }}> {/* 신고 통계 */}
        <div className="stat-card">
          <div className="stat-card-value">12</div>
          <div className="stat-card-label">미처리 신고</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-value">8</div>
          <div className="stat-card-label">오늘 들어온 신고</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-value">78%</div>
          <div className="stat-card-label">처리율</div>
        </div>
      </div>
      
      <div className="pagination"> {/* 페이지네이션 */}
        <button className="pagination-button">이전</button>
        <button className="pagination-button active">1</button>
        <button className="pagination-button">2</button>
        <button className="pagination-button">다음</button>
      </div>
    </div>
  );
}

export default ReportManagement; 