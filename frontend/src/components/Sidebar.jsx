import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const toggleMoreMenu = () => {
    setShowMoreMenu((prev) => !prev);
  };

  return (
    <aside
      className="sidebar-wrapper"
      onMouseLeave={() => {
        setShowMoreMenu(false);
      }}
    >
      {/* ⬅️ 왼쪽에 항상 보이는 둥근 시각 요소 */}
      <div className="sidebar-hint" />

      <div className="sidebar" aria-label="사이트 메뉴">
        <button
          className="sidebar__icon"
          aria-label="홈"
          onClick={() => navigate("/home")}
        >
          <img src="/imgs/home_icon.png" alt="홈" className="icon" />
        </button>

        <button
          className="sidebar__icon"
          aria-label="시간표"
          onClick={() => navigate("/schedule")}
        >
          <img src="/imgs/schedule_icon.png" alt="시간표" className="icon" />
        </button>

        <button className="sidebar__icon" aria-label="학사일정">
          <img
            src="/imgs/academicboard_icon.png"
            alt="학사일정"
            className="icon"
          />
        </button>

        <button
          className="sidebar__icon"
          aria-label="챗봇"
          onClick={() => navigate("/chatbot")}
        >
          <img src="/imgs/bot_icon.png" alt="챗봇" className="icon" />
        </button>

        <button
          className="sidebar__icon"
          aria-label="설정"
          onClick={() => navigate("/mypage")}
        >
          <img src="/imgs/setting_icon.png" alt="설정" className="icon" />
        </button>

        <div className="sidebar__icon" onClick={toggleMoreMenu}>
          <img src="/imgs/seemore_icon.png" alt="더보기" className="icon" />
          {showMoreMenu && (
            <div className="sidebar-popup-menu">
              <div className="column">
                <div onClick={() => navigate("/board/question")}>질문게시판</div>
                <div onClick={() => navigate("/board/free")}>자유게시판</div>
                <div onClick={() => navigate("/board/student")}>학생게시판</div>
                <div onClick={() => navigate("/board/professor")}>교수게시판</div>
                <div>공지사항</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;