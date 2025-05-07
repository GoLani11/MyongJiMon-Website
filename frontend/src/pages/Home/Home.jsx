import "../../styles/global.css";
import "../../styles/responsive.css";
import Header from "../../components/Header.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import BoardGrid from "../../components/BoardGrid.jsx";
import SidebarWidget from "../../components/SidebarWidget.jsx";
import BottomNav from "../../components/BottomNav.jsx";


function App() {
  return (
    <div className="app-container">
      <Header />
      <div className="sidebar-wrapper">
        <div className="sidebar-trigger"></div>
        <Sidebar />
      </div>
      <main className="main-layout">
        <BoardGrid />
        <SidebarWidget />
      </main>
      <BottomNav />
    </div>
  );
}

export default App;
