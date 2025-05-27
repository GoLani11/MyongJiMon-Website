import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';  // ✅ 추가
import 'react-toastify/dist/ReactToastify.css';   // ✅ 스타일 추가
import Main from './Main/Main';
import Login from './Login/Login';
import Home from './Home/Home'
import Schedule from './Schedule/Schedule';
import Register from './Register/Register';
import FindId from './FindId/FindId';
import FindPassword from './FindPassword/FindPassword';
import Admin from './Admin/Admin';
import MyPage from './MyPage/MyPage';
import ChatBot from './ChatBot/ChatBot';
import Board from './Board/Board';
import Post from './Post/Post';
import PostEdit from './PostEdit/PostEdit';
import { AppProvider, useAppContext } from './DataContext';
import ProtectedRoute from '../components/ProtectedRoute';
import './App.css';

// 로그인한 사용자가 로그인 페이지에 접근할 때 리다이렉트하는 컴포넌트
const LoginRedirect = () => {
  const { isLoggedIn } = useAppContext();
  
  if (isLoggedIn) {
    return <Navigate to="/home" replace />;
  }
  
  return <Login />;
};

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
          <Route path="/" element={<Main />} />
          <Route path="/main" element={<Main />} />
          <Route path="/login" element={<LoginRedirect />} />
          <Route path="/register" element={<Register />} />
          <Route path="/findid" element={<FindId />} />
          <Route path="/findpassword" element={<FindPassword />} />
          
          {/* 보호된 라우트들 */}
          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/schedule" element={
            <ProtectedRoute>
              <Schedule />
            </ProtectedRoute>
          } />
          <Route path="/mypage" element={
            <ProtectedRoute>
              <MyPage />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } />
          <Route path="/chatbot" element={
            <ProtectedRoute>
              <ChatBot />
            </ProtectedRoute>
          } />
          <Route path="/board" element={
            <ProtectedRoute>
              <Board boardTitleTest="자유 게시판"/>
            </ProtectedRoute>
          }/>
          <Route path="/post" element={
            <ProtectedRoute>
              <Post />
            </ProtectedRoute>
          }/>
          <Route path="/post/:postId" element={
            <ProtectedRoute>
              <Post />
            </ProtectedRoute>
          } />
          <Route path="/postedit" element={
            <ProtectedRoute>
              <PostEdit />
            </ProtectedRoute>
          }/>
        </Routes>

        {/* ✅ ToastContainer 추가 */}
        <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
      </Router>
    </AppProvider>
  );
}

export default App;