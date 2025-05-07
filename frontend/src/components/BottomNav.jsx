import React from "react";
import "../styles/bottomnav.css";

const BottomNav = () => {
  return (
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
        <button className="plus-button">＋</button>
      </div>
      <div className="nav-item">
        <span className="icon">🎓</span>
        <span className="label">학사일정</span>
      </div>
      <div className="nav-item">
        <span className="icon">☰</span>
        <span className="label">더보기</span>
      </div>
    </div>
  );
};

export default BottomNav;