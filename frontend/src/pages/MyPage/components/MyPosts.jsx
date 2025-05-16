import React, { useState } from 'react';

function MyPosts() {
  // 임시 게시글 데이터 (실제로는 API로 가져와야 함)
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: '리액트 공부 시작했습니다',
      content: '리액트를 공부하기 시작했는데 생각보다 재미있네요.',
      date: '2023-11-15',
      category: '자유게시판'
    },
    {
      id: 2,
      title: '과제 제출 기한 문의',
      content: '프로그래밍 과제 제출 기한이 언제인가요?',
      date: '2023-11-10',
      category: '질문게시판'
    },
    {
      id: 3,
      title: '학과 MT 신청 안내',
      content: '다음 달 학과 MT 신청이 시작되었습니다.',
      date: '2023-11-05',
      category: '공지사항'
    },
    {
      id: 4,
      title: '프로젝트 팀원 모집합니다',
      content: '졸업 프로젝트 팀원을 모집합니다. 관심 있으신 분은 연락주세요.',
      date: '2023-10-28',
      category: '구인구직'
    },
    {
      id: 5,
      title: '방학 계획',
      content: '이번 방학에는 어떤 계획을 가지고 계신가요?',
      date: '2023-10-20',
      category: '자유게시판'
    }
  ]);
  
  // 카테고리 필터 상태
  const [categoryFilter, setCategoryFilter] = useState('전체');
  
  // 필터링된 게시글
  const filteredPosts = categoryFilter === '전체' 
    ? posts 
    : posts.filter(post => post.category === categoryFilter);

  // 게시글 삭제 핸들러
  const handleDeletePost = (postId) => {
    if(window.confirm('정말 삭제하시겠습니까?')) {
      // 실제로는 API를 통해 서버에 삭제 요청
      setPosts(posts.filter(post => post.id !== postId));
      alert('게시글이 삭제되었습니다.');
    }
  };

  return (
    <div>
      <h2 className="mypage-panel-title">내가 쓴 글</h2>
      
      {/* 카테고리 필터 */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px', fontSize: '14px' }}>카테고리:</label>
        <select 
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{ padding: '5px 10px', borderRadius: '4px', border: '1px solid #ddd' }}
        >
          <option value="전체">전체</option>
          <option value="자유게시판">자유게시판</option>
          <option value="질문게시판">질문게시판</option>
          <option value="공지사항">공지사항</option>
          <option value="구인구직">구인구직</option>
        </select>
      </div>
      
      {/* 게시글 목록 */}
      {filteredPosts.length > 0 ? (
        <div className="post-list">
          {filteredPosts.map((post) => (
            <div key={post.id} className="post-item">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div className="post-title">{post.title}</div>
                  <div className="post-date">
                    <span style={{ marginRight: '10px' }}>{post.date}</span>
                    <span style={{ backgroundColor: '#f0f0f0', padding: '2px 8px', borderRadius: '10px', fontSize: '12px' }}>
                      {post.category}
                    </span>
                  </div>
                </div>
                <div>
                  <button 
                    onClick={() => handleDeletePost(post.id)}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      color: '#ff6b6b', 
                      cursor: 'pointer',
                      fontSize: '13px'
                    }}
                  >
                    삭제
                  </button>
                </div>
              </div>
              <div className="post-content">{post.content}</div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: 'center', color: '#888', padding: '20px' }}>
          작성한 게시글이 없습니다.
        </p>
      )}
      
      {/* 페이지네이션 (더미) */}
      {filteredPosts.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px', gap: '5px' }}>
          <button style={{ padding: '5px 10px', border: '1px solid #ddd', backgroundColor: '#fff', borderRadius: '4px' }}>
            &lt;
          </button>
          <button style={{ padding: '5px 10px', border: '1px solid #007bff', backgroundColor: '#007bff', color: 'white', borderRadius: '4px' }}>
            1
          </button>
          <button style={{ padding: '5px 10px', border: '1px solid #ddd', backgroundColor: '#fff', borderRadius: '4px' }}>
            2
          </button>
          <button style={{ padding: '5px 10px', border: '1px solid #ddd', backgroundColor: '#fff', borderRadius: '4px' }}>
            3
          </button>
          <button style={{ padding: '5px 10px', border: '1px solid #ddd', backgroundColor: '#fff', borderRadius: '4px' }}>
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}

export default MyPosts; 