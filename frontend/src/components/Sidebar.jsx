import "../styles/sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar" aria-label="사이트 메뉴">
      <button className="sidebar__icon" aria-label="홈">
        🏠
      </button>
      <button className="sidebar__icon" aria-label="프로필">
        👤
      </button>
      <button className="sidebar__icon" aria-label="채팅">
        💬
      </button>
      <button className="sidebar__icon" aria-label="설정">
        ⚙️
      </button>
    </aside>
  );
};

export default Sidebar;