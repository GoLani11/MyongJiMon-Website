import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Main from './Main/Main';
import Login from './Login/Login';
import Home from './Home/Home'
import Schedule from './Schedule/Schedule';
import Register from './Register/Register';
import FindId from './FindId/FindId';
import FindPassword from './FindPassword/FindPassword';
import Admin from './Admin/Admin';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Main</Link> | <Link to="/login">Login</Link> | <Link to="/home">Home</Link> | <Link to="/schedule">Schedule</Link> | <Link to="/admin">Admin</Link>
        </nav>
        <Routes>
          <Route path="/main" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/register" element={<Register />} />
          <Route path="/findid" element={<FindId />} />
          <Route path="/findpassword" element={<FindPassword />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;