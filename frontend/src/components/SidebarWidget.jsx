import "../styles/sidebarwidget.css";

const SidebarWidget = () => {
  const popularTerms = ["예비군", "훈련장", "공군", "축제", "구매", "시험"];

  return (
    <div className="sidebar-widget">
      <div className="schedule-box">
        <h3>현재 일정</h3>
        <p>일정이 없어요</p>
        <h3>다음 일정</h3>
        <p>일정이 없어요</p>
      </div>

      <div className="popular-search-box">
        <h3>인기 검색어</h3>
        <ol>
          {popularTerms.map((term, index) => (
            <li key={term}>
              <span className="rank">{index + 1}</span> {term}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default SidebarWidget;