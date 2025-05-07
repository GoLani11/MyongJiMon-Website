import "../styles/header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo-box" />
        <div className="search-box">
          <div className="search-icon" role="img" aria-label="search icon" />
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="search-input"
          />
        </div>
      </div>

      <div className="header-center">
        <span className="weather-text">
          서대문구 홍은동 날씨: <strong>12°C 맑음</strong> ☀ | 가벼운 겉옷을
          챙기세요!
        </span>
      </div>

      <div className="header-right">
        <button className="button--primary login">로그인</button>
        <button className="button--primary signup">회원가입</button>
      </div>
    </header>
  );
};

export default Header;