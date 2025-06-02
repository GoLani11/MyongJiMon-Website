import "../styles/header.css";
import { useAppContext } from "../pages/DataContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, isLoggedIn, logout } = useAppContext();
  const navigate = useNavigate();

  // 로그아웃 처리
  const handleLogout = () => {
    logout();
    navigate('/');
    alert('로그아웃되었습니다.');
  };

  // 페이지 이동 함수들
  const goToLogin = () => navigate('/login');
  const goToRegister = () => navigate('/register');
  const goToMyPage = () => navigate('/mypage');
  const goToSchedule = () => navigate('/schedule');

  return (
    <header className="header">
      <div className="header-left">
      <span className="logo-text" onClick={() => navigate('/')}>명지몬</span>
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
        {isLoggedIn ? (
          // 로그인 상태일 때
          <div className="user-menu">
            <span className="user-nickname">안녕하세요, {user?.nickname || user?.username}님!</span>
            <button className="button--secondary" onClick={goToMyPage}>마이페이지</button>
            <button className="button--secondary" onClick={goToSchedule}>시간표</button>
            <button className="button--primary logout" onClick={handleLogout}>로그아웃</button>
          </div>
        ) : (
          // 로그인하지 않은 상태일 때
          <div className="auth-buttons">
            <button className="button--primary login" onClick={goToLogin}>로그인</button>
            <button className="button--primary signup" onClick={goToRegister}>회원가입</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;