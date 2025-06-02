import React, { useState, useEffect } from "react";
import "../styles/bottomnav.css";

const BottomNav = () => {
  const [showWriteMenu, setShowWriteMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  // 윈도우 리사이즈에 따라 모바일 여부 판단
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

  // 모바일이 아닐 경우 메뉴 자동 닫기
  useEffect(() => {
    if (!isMobile) {
      setShowWriteMenu(false);
      setShowMoreMenu(false);
    }
  }, [isMobile]);

  // 모바일 전용 렌더링
  if (!isMobile) return null;

  return (
    <>
      <div className="bottom-nav">
        <div className="nav-item">
          <span className="icon">📅</span>
          <span className="label">시간표</span>
        </div>
        <div className="nav-item">
          <span className="icon">📋</span>
          <span className="label">게시판</span>
        </div>
        <div className="nav-item center-button">
          <button className="plus-button" onClick={toggleWriteMenu}>＋</button>
        </div>
        <div className="nav-item">
          <span className="icon">🎓</span>
          <span className="label">학사일정</span>
        </div>
        <div className="nav-item" onClick={toggleMoreMenu}>
          <span className="icon">☰</span>
          <span className="label">더보기</span>
        </div>
      </div>

      {showWriteMenu && (
        <div className="write-menu">
          <span className="label">글쓰기</span>
          <ul>
            <li>🎓 교수 게시판</li>
            <li>🎒 학생 게시판</li>
            <li>🗣 자유 게시판</li>
            <li>📚 질문 게시판</li>
          </ul>
        </div>
      )}

      {showMoreMenu && (
        <div className="more-menu-3col">
          <div className="menu-3col-columns">
            <div className="column">
              <div>Q&A</div>
              <div>커뮤니티</div>
              <div>동아리</div>
            </div>
            <div className="column">
              <div>시간표</div>
              <div>학사 일정</div>
              <div>공지 사항</div>
            </div>
            <div className="column">
              <div><strong>마이페이지</strong></div>
              <div>회원가입</div>
              <div>챗봇</div>
            </div>
          </div>

          <div className="menu-bottom">
            <button className="login-btn">로그인</button>
            <button className="join-btn">회원가입</button>
          </div>
        </div>
      )}
    </>
  );
};

export default BottomNav;