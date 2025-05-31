import React, { useState } from 'react';
import { AiOutlineUser, AiOutlineFileText, AiOutlineNotification, AiOutlineWarning, AiOutlineDashboard } from 'react-icons/ai';
import './Admin.css';

// Admin 컴포넌트들
import AdminDashboard from './components/AdminDashboard';
import UserManagement from './components/UserManagement';
import PostManagement from './components/PostManagement';
import NoticeManagement from './components/NoticeManagement';
import ReportManagement from './components/ReportManagement';

function Admin() {
  // 현재 메뉴 상태
  const [activeMenu, setActiveMenu] = useState('dashboard');

  // 메뉴 목록
  const menus = [
    { id: 'dashboard', name: '대시보드', icon: <AiOutlineDashboard className="admin-menu-icon" /> },
    { id: 'users', name: '사용자 관리', icon: <AiOutlineUser className="admin-menu-icon" /> },
    { id: 'posts', name: '게시글 관리', icon: <AiOutlineFileText className="admin-menu-icon" /> },
    { id: 'notices', name: '공지사항 관리', icon: <AiOutlineNotification className="admin-menu-icon" /> },
    { id: 'reports', name: '신고 관리', icon: <AiOutlineWarning className="admin-menu-icon" /> }
  ];

  // 메뉴에 따라 다른 컴포넌트 보여주기
  const renderComponent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'users':
        return <UserManagement />;
      case 'posts':
        return <PostManagement />;
      case 'notices':
        return <NoticeManagement />;
      case 'reports':
        return <ReportManagement />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="page-container admin-container">
      <h1 className="admin-title">관리자 페이지</h1>
      
      <div className="admin-content">
        {/* 사이드바 */}
        <div className="admin-sidebar">
          <div className="admin-sidebar-title">관리자 메뉴</div>
          <div className="admin-menu">
            {menus.map((menu) => (
              <div
                key={menu.id}
                className={`admin-menu-item ${activeMenu === menu.id ? 'active' : ''}`}
                onClick={() => setActiveMenu(menu.id)}
              >
                {menu.icon} {menu.name}
              </div>
            ))}
          </div>
        </div>
        
        {/* 메인 영역 */}
        <div className="admin-main">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}

export default Admin; 