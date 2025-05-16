import React from 'react';

function AdminDashboard() {
  // 통계 데이터 (실제 구현 시 API에서 받아오도록 수정 필요)
  const stats = [
    { id: 1, value: '5,234', label: '전체 회원' },
    { id: 2, value: '154', label: '오늘 방문자' },
    { id: 3, value: '9,724', label: '전체 게시글' },
    { id: 4, value: '87', label: '오늘 작성된 글' },
    { id: 5, value: '12', label: '미처리 신고' },
    { id: 6, value: '98.5%', label: '서비스 가용성' }
  ];

  // 최근 활동 데이터 (실제 구현 시 API에서 받아오도록 수정 필요)
  const recentActivities = [
    { id: 1, type: '게시글', title: '시험 기간 도서관 이용 시간', user: '김학생', time: '10분 전' },
    { id: 2, type: '댓글', title: '축제 라인업 어떻게 생각하세요?', user: '이대학', time: '25분 전' },
    { id: 3, type: '회원가입', title: '새 회원 가입', user: '박신입', time: '1시간 전' },
    { id: 4, type: '신고', title: '부적절한 게시글 신고', user: '최관리', time: '2시간 전' },
    { id: 5, type: '게시글', title: '학생회 회의록', user: '정학생', time: '3시간 전' }
  ];

  return (
    <div>
      <h2 className="admin-panel-title">대시보드</h2>
      
      {/* 통계 카드 */}
      <div className="admin-stats">
        {stats.map((stat) => (
          <div key={stat.id} className="stat-card">
            <div className="stat-card-value">{stat.value}</div>
            <div className="stat-card-label">{stat.label}</div>
          </div>
        ))}
      </div>
      
      {/* 최근 활동 */}
      <div>
        <h3 className="admin-panel-title">최근 활동</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>종류</th>
              <th>내용</th>
              <th>사용자</th>
              <th>시간</th>
            </tr>
          </thead>
          <tbody>
            {recentActivities.map((activity) => (
              <tr key={activity.id}>
                <td>{activity.type}</td>
                <td>{activity.title}</td>
                <td>{activity.user}</td>
                <td>{activity.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard; 