import React, { useState } from 'react';
import { AiOutlineUser, AiOutlineLock, AiOutlineFileText, AiOutlineSetting, AiOutlineTeam } from 'react-icons/ai';
import './MyPage.css';

// 하위 컴포넌트 가져오기
import ProfileInfo from './components/ProfileInfo';
import EditProfile from './components/EditProfile';
import ChangePassword from './components/ChangePassword';
import MyPosts from './components/MyPosts';
import AccountSettings from './components/AccountSettings';
import FriendGroupManagement from './components/FriendGroupManagement';

function MyPage() {
  // 현재 메뉴 상태
  const [activeMenu, setActiveMenu] = useState('profile');

  // 메뉴 목록
  const menus = [
    { id: 'profile', name: '내 프로필', icon: <AiOutlineUser className="mypage-menu-icon" /> },
    { id: 'edit', name: '프로필 수정', icon: <AiOutlineUser className="mypage-menu-icon" /> },
    { id: 'password', name: '비밀번호 변경', icon: <AiOutlineLock className="mypage-menu-icon" /> },
    { id: 'posts', name: '내가 쓴 글', icon: <AiOutlineFileText className="mypage-menu-icon" /> },
    { id: 'friends', name: '친구 및 그룹 관리', icon: <AiOutlineTeam className="mypage-menu-icon" /> },
    { id: 'settings', name: '계정 설정', icon: <AiOutlineSetting className="mypage-menu-icon" /> }
  ];

  // 메뉴에 따라 다른 컴포넌트 보여주기
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
      case 'settings':
        return <AccountSettings />;
      case 'friends':
        return <FriendGroupManagement />;
      default:
        return <ProfileInfo />;
    }
  };

  return (
    <div className="mypage-container">
      <h1 className="mypage-title">마이페이지</h1>
      
      <div className="mypage-content">
        {/* 사이드바 */}
        <div className="mypage-sidebar">
          <div className="mypage-sidebar-title">내 계정</div>
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
        
        {/* 메인 영역 */}
        <div className="mypage-main">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}

export default MyPage; 