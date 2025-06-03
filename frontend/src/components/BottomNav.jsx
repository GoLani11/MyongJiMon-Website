import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/bottomnav.css";

const BottomNav = () => {
  const [showWriteMenu, setShowWriteMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleWriteMenu = () => {
    setShowWriteMenu((prev) => !prev);
    setShowMoreMenu(false);
  };

  const toggleMoreMenu = () => {
    setShowMoreMenu((prev) => !prev);
    setShowWriteMenu(false);
  };

  useEffect(() => {
    if (!isMobile) {
      setShowWriteMenu(false);
      setShowMoreMenu(false);
    }
  }, [isMobile]);

  if (!isMobile) return null;

  return (
    <>
      <div className="bottom-nav">
        <div className="nav-item" onClick={() => navigate("/schedule")}>
        <img src="/imgs/schedule_icon.png" alt="시간표" className="icon" />
          <span className="label">시간표</span>
        </div>
        <div className="nav-item" onClick={() => navigate("/board/popular")}>
        <img src="/imgs/board_icon.png" alt="인기게시판" className="icon" />
          <span className="label">인기게시판</span>
        </div>
        <div className="nav-item center-button">
          <button className="plus-button" onClick={toggleWriteMenu}>
          <img src="/imgs/write_icon.png" alt="작성하기" className="icon" />
          </button>
        </div>
        <div className="nav-item" onClick={() => navigate("/board/academic")}>
        <img src="/imgs/academicboard_icon.png" alt="학사일정" className="icon" />
          <span className="label">학사일정</span>
        </div>
        <div className="nav-item" onClick={toggleMoreMenu}>
        <img src="/imgs/seemore_icon.png" alt="더보기" className="icon" />
          <span className="label">더보기</span>
        </div>
      </div>

      {showWriteMenu && (
        <div className="write-menu">
          <span className="label">글쓰기</span>
          <ul>
            <li onClick={() => navigate("/postedit?board=free")}>🗣 자유 게시판</li>
            <li onClick={() => navigate("/postedit?board=student")}>🎒 학생 게시판</li>
            <li onClick={() => navigate("/postedit?board=professor")}>🎓 교수 게시판</li>
            <li onClick={() => navigate("/postedit?board=question")}>📚 질문 게시판</li>
          </ul>
        </div>
      )}

      {showMoreMenu && (
        <div className="more-menu-3col">
          <div className="menu-3col-columns">
            <div className="column">
              <div onClick={() => navigate("/board/question")}>질문게시판</div>
              <div onClick={() => navigate("/board/free")}>자유게시판</div>
              <div onClick={() => navigate("/board/student")}>학생게시판</div>
            </div>
            <div className="column">
              <div onClick={() => navigate("/schedule")}>시간표</div>
              <div onClick={() => navigate("/schedule")}>학사 일정</div>
              <div onClick={() => navigate("/board/professor")}>교수시판</div>
            </div>
            <div className="column">
              <div onClick={() => navigate("/mypage")}><strong>마이페이지</strong></div>
              <div onClick={() => navigate("/chatbot")}>챗봇</div>
              <div onClick={() => navigate("/board/notices")}>공지 사항</div>
            </div>
          </div>

          <div className="menu-bottom">
            <button className="login-btn" onClick={() => navigate("/login")}>로그인</button>
            <button className="join-btn" onClick={() => navigate("/register")}>회원가입</button>
          </div>
        </div>
      )}
    </>
  );
};

export default BottomNav;