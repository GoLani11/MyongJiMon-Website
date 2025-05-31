import React, { useState } from 'react';
import { AiOutlineUser, AiOutlineEdit, AiOutlineLock, AiOutlineFileText, AiOutlineUsergroupAdd } from 'react-icons/ai';
import './MyPage.css';

// 하위 컴포넌트 가져오기
import ProfileInfo from './components/ProfileInfo';
import EditProfile from './components/EditProfile';
import ChangePassword from './components/ChangePassword';
import MyPosts from './components/MyPosts';
import AccountSettings from './components/AccountSettings';
import FriendGroupManagement from './components/FriendGroupManagement';

function MyPage() {
  // 현재 활성 메뉴 상태
  const [activeMenu, setActiveMenu] = useState('profile');

  // 메뉴 목록
  const menus = [
    { id: 'profile', name: '프로필 정보', icon: <AiOutlineUser className="mypage-menu-icon" /> },
    { id: 'edit', name: '프로필 수정', icon: <AiOutlineEdit className="mypage-menu-icon" /> },
    { id: 'password', name: '비밀번호 변경', icon: <AiOutlineLock className="mypage-menu-icon" /> },
    { id: 'posts', name: '내 게시글', icon: <AiOutlineFileText className="mypage-menu-icon" /> },
    { id: 'friends', name: '친구/그룹 관리', icon: <AiOutlineUsergroupAdd className="mypage-menu-icon" /> },
    { id: 'settings', name: '계정 설정', icon: <AiOutlineUser className="mypage-menu-icon" /> }
  ];

  // 메뉴에 따라 다른 컴포넌트 렌더링
  const renderComponent = () => {
    switch (activeMenu) {
      case 'profile':
        return <ProfileInfo />;
      case 'edit':
        return <EditProfile />;
      case 'password':
        return <ChangePassword />;
      case 'posts':
        return <MyPosts />;
      case 'friends':
        return <FriendGroupManagement />;
      case 'settings':
        return <AccountSettings />;
      default:
        return <ProfileInfo />;
    }
  };

  return (
    <div className="page-container mypage-container">
      <h1 className="mypage-title">마이페이지</h1>
      
      <div className="mypage-content">
        {/* 사이드바 */}
        <div className="mypage-sidebar">
          <div className="mypage-sidebar-title">메뉴</div>
          <div className="mypage-menu">
            {menus.map((menu) => (
              <div
                key={menu.id}
                className={`mypage-menu-item ${activeMenu === menu.id ? 'active' : ''}`}
                onClick={() => setActiveMenu(menu.id)}
              >
                {menu.icon} {menu.name}
              </div>
            ))}
          </div>
        </div>
        
        {/* 메인 콘텐츠 영역 */}
        <div className="mypage-main">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}

export default MyPage; 