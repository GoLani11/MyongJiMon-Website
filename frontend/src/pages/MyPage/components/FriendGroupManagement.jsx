import React, { useState } from 'react';

function FriendGroupManagement() {
  // 임시 친구 목록 데이터
  const [friends, setFriends] = useState([
    { id: 1, name: '김철수' },
    { id: 2, name: '박영희' },
    { id: 3, name: '이민수' },
  ]);

  // 임시 그룹 목록 데이터
  const [groups, setGroups] = useState([
    { id: 1, name: '스터디 그룹 1' },
    { id: 2, name: '프로젝트 팀' },
  ]);

  // 새로운 친구 추가를 위한 상태
  const [newFriendUsername, setNewFriendUsername] = useState('');

  // 친구 추가 핸들러 (더미)
  const handleAddFriend = (e) => {
    e.preventDefault();
    if (newFriendUsername.trim() === '') {
      alert('친구 아이디를 입력해주세요.');
      return;
    }
    // 실제로는 API 호출하여 친구 추가 로직 구현
    alert(`${newFriendUsername} 님에게 친구 요청을 보냈습니다.`);
    setNewFriendUsername('');
  };

  // 친구 삭제 핸들러 (더미)
  const handleDeleteFriend = (friendId) => {
    if (window.confirm('정말 이 친구를 삭제하시겠습니까?')) {
      // 실제로는 API 호출하여 친구 삭제 로직 구현
      setFriends(friends.filter(friend => friend.id !== friendId));
      alert('친구가 삭제되었습니다.');
    }
  };

  return (
    <div>
      <h2 className="mypage-panel-title">친구 및 그룹 관리</h2>

      {/* 친구 추가 섹션 */}
      <div className="admin-form" style={{ marginBottom: '30px' }}> {/* Admin 페이지 폼 스타일 재활용 */}
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '15px' }}>새 친구 추가</h3>
        <form onSubmit={handleAddFriend} className="search-form" style={{ flexDirection: 'row' }}> {/* Admin 페이지 검색 폼 스타일 재활용 */}
          <input
            type="text"
            placeholder="친구 아이디 입력"
            className="search-input" // Admin 페이지 검색 입력창 스타일 재활용
            value={newFriendUsername}
            onChange={(e) => setNewFriendUsername(e.target.value)}
            style={{ flex: 1 }}
          />
          <button type="submit" className="search-button">친구 추가</button> {/* Admin 페이지 검색 버튼 스타일 재활용 */}
        </form>
      </div>

      {/* 친구 목록 */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '15px' }}>친구 목록 ({friends.length})</h3>
        {friends.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {friends.map(friend => (
              <li key={friend.id} style={{ padding: '12px 0', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '15px', color: '#333' }}>{friend.name}</span>
                <button 
                  onClick={() => handleDeleteFriend(friend.id)}
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
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: '#666', fontSize: '14px' }}>친구가 없습니다. 아이디로 친구를 추가해보세요!</p>
        )}
      </div>

      {/* 그룹 목록 */}
      <div>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '15px' }}>그룹 목록 ({groups.length})</h3>
        {groups.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {groups.map(group => (
              <li key={group.id} style={{ padding: '12px 0', borderBottom: '1px solid #eee', fontSize: '15px', color: '#333' }}>
                {group.name} (멤버 수: N명) {/* 멤버 수 표시 등 추가 필요 */}
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: '#666', fontSize: '14px' }}>참여 중인 그룹이 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default FriendGroupManagement; 