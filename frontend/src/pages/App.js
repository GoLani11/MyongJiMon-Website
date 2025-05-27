import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';  // ✅ 추가
import 'react-toastify/dist/ReactToastify.css';   // ✅ 스타일 추가
import Main from './Main/Main';
import Login from './Login/Login';
import Home from './Home/Home'
import Schedule from './Schedule/Schedule';
import Register from './Register/Register';
import FindId from './FindId/FindId';
import FindPassword from './FindPassword/FindPassword';
/*
import Admin from './Admin/Admin';
import MyPage from './MyPage/MyPage';
*/
import ChatBot from './ChatBot/ChatBot';
import Board from './Board/Board';
import Post from './Post/Post';
import PostEdit from './PostEdit/PostEdit';
import { AppProvider } from './DataContext';
import './App.css';

function App() {
  return (
    <AppProvider>
      <Router>
      <div className="App">
      <nav>
          <Link to="/">Main</Link> | 
          <Link to="/login">Login</Link> | 
          <Link to="/home">Home</Link> | 
          <Link to="/schedule">Schedule</Link> | 
          <Link to="/admin">Admin</Link> | 
          <Link to="/mypage">MyPage</Link> | 
          <Link to="/chatbot">ChatBot</Link> | 
          <Link to="/board">Board</Link> | 
          <Link to="/post">Post</Link> | 
          <Link to="/postedit">PostEdit</Link>
        </nav>
        <Routes>
          <Route path="/main" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/register" element={<Register />} />
          <Route path="/findid" element={<FindId />} />
          <Route path="/findpassword" element={<FindPassword />} />
          {/*
          <Route path="/admin" element={<Admin />} />
          <Route path="/mypage" element={<MyPage />} />
          */}
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/board" element={<Board boardTitleTest="자유 게시판"/>}/>
          <Route path="/post" element={<Post />}/>
          <Route path="/post/:postId" element={<Post />} /> {/* postId를 URL 파라미터로 받는 라우트 설정 */}
          <Route path="/postedit" element={<PostEdit />}/>
        </Routes>

        {/* ✅ ToastContainer 추가 */}
        <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
      </Router>
    </AppProvider>
  );
}

export default App;